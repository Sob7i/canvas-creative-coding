import { useEffect, useState } from "react";
import ImgSequenceScroll from "../hooks/useScrollSequence";

const prioFrames = [0, 3, 7, 10]
// const prioFrames = [0, 10, 20, 30, 40, 50]
const BASE_URL = 'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/'

export default function Home() {
  const [frames, setFrames] = useState([])

  useEffect(() => {
    let appleSequenceImages = []

    for (let i = 0; i <= 10; i++) {
      const num = i.toString().padStart(4, '0')
      const format = '.jpg'

      const src = `${BASE_URL}${num}${format}`
      appleSequenceImages.push(src);
    }

    setFrames(appleSequenceImages)
  }, [])

  return (
    <div>
      <main>
        <div id='scroll-down'>
          Scroll down 👇
        </div>
        <ImgSequenceScroll
          frames={frames}
          prioFrames={prioFrames}
          loadingFallback={<p>loading...</p>}
        />
        <div id='scroll-down'>
          Scroll up 👆
        </div>
        <div id='scroll-down'>
          Scroll up 👆
        </div>
        <div id='scroll-down'>
          Scroll up 👆
        </div>
      </main>
    </div>
  )
}
