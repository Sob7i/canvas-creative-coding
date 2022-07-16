/*
  TODO - create loading queue :
    * start from the prio queue ex: total is 350 => prio queue is [0, 50, 100, 150, 200, 250, 300, 350]
    * Load 10 frames each time ex: [10, 60, 110, 160, 210, 260, 310] => [20, 70, 120, 170, 220, 270, 320]
    * When all 10ths are loaded then load mid of each them =>  [5, 55, 105, 155, 205, 255, 305]
    * When all 5ths are loaded then load minmax => [4, 54, 104, 154, 204, ...] => [6, 56, 106, 156, 206, ...]
    * Update the images array after each iteration 
  TODO - create load image function:
  TODO - create load next image function
*/

import { EventType, loader } from "./observer"

export interface LoaderProps {
  prioFrames: number[]
  frames: string[]
}

interface LoaderResult {
  images: [] | HTMLImageElement[];
  isComplete: boolean;
}

export default async function loadImagesAsync({
  prioFrames = [],
  frames = [],
}) {
  const prioQueue: number[] = createPrioQueue(prioFrames)
  const loadingQueue: number[] = createLoadingQueue(frames).filter(elem => elem !== 0)
  let isComplete: boolean = false
  let images: LoaderResult['images'] = []

  function loadImage(i: number): Promise<void> {
    if (!frames.length) return

    if (images[i]) {
      loadNextImage();
    }

    function onLoad() {
      images[i] = img

      if (i === 0) {
        loader.emit(EventType.FIRST_IMAGE_LOADED, images)
      }

      loadNextImage()

      return () => {
        img.removeEventListener('load', onLoad);
      }
    }

    const img = new Image;
    img.src = frames[i]
    img.addEventListener('load', onLoad)
  }

  function loadNextImage() {
    if (prioQueue.length) {
      loadImage(prioQueue.shift())

      if (!prioQueue.length) {
        loader.emit(EventType.PRIORITY_IMAGES_LOADED, images)
      }
    } else if (loadingQueue.length) {
      loadImage(loadingQueue.shift())
    }
    else {
      isComplete = true
      loader.emit(EventType.ALL_IMAGES_LOADED, images)
    }
  }

  loadNextImage()
}

function createLoadingQueue(frames: string[]) {
  const queue = frames
    .map((f, i) => i)
    .sort((a, b) => {
      // TODO write a describtion
      const r = Math.abs(a - frames.length / 2) - Math.abs(b - frames.length / 2)
      return r
    });

  return queue
}

function createPrioQueue(prioFrames: number[]) {
  const queue: number[] = [...prioFrames];

  if (!queue.length) {
    queue.push(0);
    queue.push(Math.round(frames.length / 2));
    queue.push(frames.length - 1);
  }

  return queue;
}
