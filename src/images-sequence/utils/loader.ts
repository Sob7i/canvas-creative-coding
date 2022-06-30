/*
  TODO - create priority queue (input as arg)
  TODO - create loading queue 
  TODO - create load image function:
  TODO - create load next image function
*/

import { EventType, loadingObservable } from "./observer"

export interface LoaderProps {
  prioFrames: number[]
  frames: string[]
}

export default async function loadImgsAsync({
  prioFrames = [],
  frames = [],
}: LoaderProps) {
  const prioQueue: number[] = createPrioQueue()
  const loadingQueue: number[] = createLoadingQueue()
  let isComplete: boolean = true
  let images: HTMLImageElement[] | [] = []

  function createPrioQueue() {
    const queue: number[] = [...prioFrames];

    if (!queue.length) {
      queue.push(0);
      queue.push(Math.round(frames.length / 2));
      queue.push(frames.length - 1);
    }

    return queue;
  }

  function createLoadingQueue() {
    const queue = frames
      .map((f, i) => i)
      .sort((a, b) => {
        const r = Math.abs(a - frames.length / 2) - Math.abs(b - frames.length / 2)
        // console.log('r', r)
        return r
      });

    return queue
  }

  async function loadImage(i: number): Promise<void> {
    if (!frames.length) return

    if (images[i]) {
      return loadNextImage();
    }

    function onLoad() {
      img.removeEventListener('load', onLoad);
      images[i] = img
      // console.log(' images[i]',  images[i])
      if (i === 0) {
        loadingObservable.emit(EventType.FIRST_IMAGE_LOADED)
      }

      return loadNextImage()
    }

    const img = new Image;
    img.src = frames[i]
    img.addEventListener('load', onLoad)
  }

  async function loadNextImage(): Promise<void> {
    if (prioQueue.length) {
      const ImgIndex = prioQueue.shift()
      await loadImage(ImgIndex);

      if (!prioQueue.length) {
        loadingObservable.emit(EventType.PRIORITY_IMAGES_LOADED)
      }
    } else if (loadingQueue.length) {
      const ImgIndex = loadingQueue.shift()
      await loadImage(ImgIndex)
    }
    else {
      isComplete = false
      loadingObservable.emit(EventType.ALL_IMAGES_LOADED)
    }
  }

  return await loadNextImage()
    .then(() => {
      return { images, isComplete }
    })
    .catch(error => {
      throw new Error(`Error loading images: ${error}`)
    })
}
