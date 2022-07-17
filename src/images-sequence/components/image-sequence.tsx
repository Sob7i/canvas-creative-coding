import { useImgsSequence } from "../hooks/useScrollSequence"
import { LoaderProps } from "../utils/loader"

type ScrollSequenceProps = LoaderProps & {
  loadingFallback: JSX.Element
  cn?: string
}

export default function ImgsSequence({
  frames,
  prioFrames,
  cn = ''
}: ScrollSequenceProps): JSX.Element {
  const { containerHeight, canvasRef, containerRef } = useImgsSequence({
    frames,
    prioFrames
  })

  return (
    <div
      ref={containerRef}
      className='scroll-sequence-container'
      style={{ height: containerHeight }}
    >
      <canvas
        className={cn}
        ref={canvasRef}
      />
    </div>
  )
}
