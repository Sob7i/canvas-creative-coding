import { useState, useEffect, useRef } from 'react'

import loadImgsAsync, { LoaderProps } from '../utils/loader'
import { loadingObservable, EventType } from '../utils/observer'

type Props = LoaderProps

export function useImgSequenceScroll({
  frames,
  prioFrames
}: Props) {
  const canvasRef = useRef(null)
  const canvasContainerRef = useRef(null)
  const [isLoading, setLoading] = useState(false)
  console.log('isLoading hook', isLoading)
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
      () => console.log(EventType.PRIORITY_IMAGES_LOADED)
    )

    loadImgsAsync({ frames, prioFrames })
      .then(({ isComplete }) => setLoading(isComplete))

  }, [frames])

  return { isLoading, canvasRef, canvasContainerRef }
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
  const { canvasRef, canvasContainerRef } = useImgSequenceScroll({
    frames,
    prioFrames
  })

  return (
    <div id='imgSS'>
      <div id='imgSS-sticky' ref={canvasContainerRef}>
        <canvas
          id='imgSS-canvas'
          className={cn}
          ref={canvasRef}
        />
      </div>
    </div>
  )
}

{/* {isLoading ?
  (<div id='loadingFallback'>{loadingFallback}</div>) :
  (<canvas id='canvas' className={cn} ref={canvasRef} />)
} */}