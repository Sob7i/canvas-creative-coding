import { useEffect, useState } from "react";
import ImgSequenceScroll from "../hooks/useScrollSequence";

const prioFrames = [0, 25, 50, 75, 100, 125]
const BASE_URL = 'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/'

export default function Home() {
  const [frames, setFrames] = useState([])
  const [framesCount, setFramesCount] = useState(131)

  useEffect(() => {
    let appleSequenceImages = []

    for (let i = 0; i <= framesCount; i++) {
      const num = i.toString().padStart(4, '0')
      const format = '.jpg'

      const src = `${BASE_URL}${num}${format}`
      appleSequenceImages.push(src);
    }

    setFrames(appleSequenceImages)
  }, [framesCount])

  return (
    <>
      <div className='scroll-down'>
        Scroll down 👇
      </div>
      <ImgSequenceScroll
        frames={frames}
        prioFrames={prioFrames}
        loadingFallback={<p>loading...</p>}
      />
      <div className='scroll-down'>
        Scroll up 👆
      </div>
    </>
  )
}
