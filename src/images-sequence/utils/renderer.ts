export default function createRenderer({
  canvasRef,
  images,
  imageIndex
}) {
  let canvas: HTMLCanvasElement | null
  let ctx: CanvasRenderingContext2D | null

  function setup() {
    canvas = canvasRef.current;
    ctx = canvas?.getContext('2d')

    window.addEventListener('resize', () => resize());
    resize();
  }

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.style.height = `${h}px`;
    canvas.style.width = `${w}px`;
    canvas.height = h;
    canvas.width = w;

    renderImage(imageIndex);
  }

  function renderImage(i: number) {
    if (images[i]) {
      return drawImage(i);
    }
    // Find closest loaded image
    for (var t = Number.MAX_SAFE_INTEGER, r = i; r >= 0; r--)
      if (images[r]) {
        t = r;
        break
      }
    for (var n = Number.MAX_SAFE_INTEGER, j = i, o = images.length; j < o; j++)
      if (images[j]) {
        n = j;
        break
      }
    images[t] ? drawImage(t) : images[n] && drawImage(n)
  }

  function drawImage(i: number) {
    imageIndex = i
    const x = Math.floor((canvas.width - images[imageIndex].naturalWidth) / 2);
    const y = Math.floor((canvas.height - images[imageIndex].naturalHeight) / 2);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images[imageIndex], x, y);
  }

  return {
    drawImage,
    renderImage,
    setup
  }
}
