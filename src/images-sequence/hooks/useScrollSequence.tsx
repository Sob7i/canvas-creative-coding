import { useState, useEffect, useRef, MutableRefObject } from 'react'

import { loadingObservable, EventType } from '../utils/observer'
import loadImgsAsync, { LoaderProps } from '../utils/loader'

type Props = LoaderProps

export function useImgSequenceScroll({
  frames,
  prioFrames
}: Props) {
  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null)
  const canvasContainerRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const [isLoading, setLoading] = useState(false)
  const [isSticky, setSticky] = useState(false)
  const [frameIndex, setFrameIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const handlScroll = (e: any) => {
    // TODO add onScroll cb
    // Document's ref
    const doc = document.documentElement;
    // Canvas's container div ref
    const container = canvasContainerRef.current;
    const rect = container.getBoundingClientRect();
    const ch = container.clientHeight || container.offsetHeight
    // How much a user scrolled from the top of the document
    const st = doc.scrollTop;
    // Distance between the top of the document and the top of the container
    const ot = container.offsetTop
    // How far the scroll bar is from the top of the container in pixels
    const progressInPX = st - ot
    // Progress in percentage
    const progressInPrec = (100 * progressInPX) / ch
    // Progress between 0 and 100 only 
    const progressMinMax = progressInPrec > 100 ? 100
      : progressInPrec < 0 ? 0
        : progressInPrec;
    // Progress with only 3 decimal digits
    const progress = Number(progressMinMax.toFixed(3))
    // The equivalent progress value to each frame 
    const step = 100 / frames.length
    // The corresponding frame index to the progress value
    const frameIndex = Math.floor(progress / step)
    console.log('progress', progress)

    setProgress(progress)
    setFrameIndex(frameIndex)
    setSticky(rect.top > 0)

    return () => {
      window.removeEventListener('scroll', handlScroll);
    }
  }

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      frames.length === 0
    ) return

    loadingObservable.once(
      EventType.FIRST_IMAGE_LOADED,
      () => console.log(EventType.FIRST_IMAGE_LOADED)
    )

    loadingObservable.once(
      EventType.PRIORITY_IMAGES_LOADED,
      () => {
        console.log(EventType.PRIORITY_IMAGES_LOADED)
        window.addEventListener('scroll', (e: any) => handlScroll(e))
      }
    )

    window.addEventListener('scroll', (e: any) => handlScroll(e))

    // loadImgsAsync({ frames, prioFrames })
    //   .then(({ isComplete }) => {
    //     setLoading(isComplete)
    //   })

  }, [frames])

  return {
    isLoading,
    isSticky,
    progress,
    frameIndex,
    canvasRef,
    canvasContainerRef
  }
}

type ScrollSequenceProps = Props & {
  loadingFallback: JSX.Element
  cn?: string
}

export default function ImgSequenceScroll({
  frames,
  prioFrames,
  loadingFallback,
  cn = ''
}: ScrollSequenceProps): JSX.Element {
  const { isSticky, canvasRef, canvasContainerRef } = useImgSequenceScroll({
    frames,
    prioFrames
  })

  return (
    // <div id='imgSS'>
    <div id='imgSS' className={`${isSticky ? 'sticky' : 'relative'}`} ref={canvasContainerRef}>
      <p>Yooo i'm sticky</p>
      <canvas
        id='imgSS-canvas'
        className={cn}
        ref={canvasRef}
      />
    </div>
    // </div>
  )
}

{/* {isLoading ?
  (<div id='loadingFallback'>{loadingFallback}</div>) :
  (<canvas id='canvas' className={cn} ref={canvasRef} />)
} */}