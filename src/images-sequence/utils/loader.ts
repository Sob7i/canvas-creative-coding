/*
  TODO - create priority queue (input as arg)
  TODO - create loading queue 
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
