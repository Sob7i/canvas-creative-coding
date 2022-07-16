import { useEffect, useState } from "react";
import ImgSequenceScroll from "../hooks/useScrollSequence";

// Apple airpod sequence -> 131 frames
const BASE_URL = 'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/'
const prioFrames = [0, 25, 50, 75, 100, 125]
const framesCount = 131
const padStart = 4

// In the forest sequence -> 98 frames
// const BASE_URL = 'https://jacobbelanger.com/assets/sequence/'
// const prioFrames = [0, 20, 40, 60, 80, 90, 98]
// const framesCount = 98
// const padStart = 3

export default function Home() {
  const [frames, setFrames] = useState([])

  useEffect(() => {
    let appleSequenceImages = []

    for (let i = 0; i <= framesCount; i++) {
      const num = i.toString().padStart(padStart, '0')
      const format = '.jpg'

      const src = `${BASE_URL}${num}${format}`
      appleSequenceImages.push(src);
    }

    setFrames(appleSequenceImages)
  }, [])

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
