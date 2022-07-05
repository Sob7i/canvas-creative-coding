import {
  useState,
  useEffect,
  useRef,
  MutableRefObject
} from 'react'

import { loader, EventType } from '../utils/observer'
import loadImagesAsync, { LoaderProps } from '../utils/loader'
import createRenderer from '../utils/renderer'

type Props = LoaderProps

export function useImgSequenceScroll({
  frames,
  prioFrames
}: Props) {
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null)
  const [images, setImages] = useState<[] | HTMLImageElement[]>([])
  const [isLoading, setLoading] = useState(false)
  const [isSticky, setSticky] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const { setup, renderImage } = createRenderer({
    canvasRef,
    containerRef,
    images,
    imageIndex
  })

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined'
    ) return

    setup()
  }, [setup])

  useEffect(() => {
    loadImagesAsync({ frames, prioFrames })

  }, [frames, prioFrames])

  useEffect(() => {
    const handlScroll = () => {
      // TODO add onScroll cb
      // Document's ref
      const doc = document.documentElement;
      // Canvas's container div ref
      const container = containerRef.current;
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
      const progress = progressInPrec > 100 ? 100
        : progressInPrec < 0 ? 0
          : progressInPrec;
      // Progress with only 3 decimal digits
      // const progress = Number(progressMinMax.toFixed(3))
      // The equivalent progress value to each frame 
      const step = 100 / frames.length
      // The corresponding frame index to the progress value
      const imageIndex = Math.floor(progress / step)

      // setProgress(progress)
      // setImageIndex(imageIndex)
      // setSticky(rect.top <= 0)  // TODO handle position

      requestAnimationFrame(() => renderImage(imageIndex))

      return () => {
        window.removeEventListener('scroll', handlScroll);
      }
    }

    loader.once(
      EventType.FIRST_IMAGE_LOADED,
      (imgs) => {
        setImages(imgs)
        renderImage(0)
      }
    )

    loader.once(
      EventType.PRIORITY_IMAGES_LOADED,
      (imgs) => {
        setImages(imgs)
        window.addEventListener('scroll', handlScroll)
      }
    )

    loader.once(
      EventType.ALL_IMAGES_LOADED,
      (imgs) => { setImages(imgs) }
    )
  }, [frames.length, renderImage])

  useEffect(() => {
    loader.once(
      EventType.ALL_IMAGES_LOADED,
      (imgs) => { setImages(imgs) }
    )

  }, [frames, prioFrames])

  return {
    isLoading,
    isSticky,
    progress,
    imageIndex,
    canvasRef,
    containerRef
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
  const { canvasRef, containerRef } = useImgSequenceScroll({
    frames,
    prioFrames
  })

  return (
    <div className='scroll-container'>
      <div
        ref={containerRef}
        className='scroll-sequence'
      >
        <canvas
          className={cn}
          ref={canvasRef}
        />
      </div >
    </div>
  )
}
