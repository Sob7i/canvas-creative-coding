
export interface ScrollerProps {
  canvasRef: HTMLElement | null;
  canvasContainerRef: HTMLElement | null;
  onScroll: (i: number) => void;
  sequenceLength: number;
  starts: string
  ends?: string
}

export default function createScroller({ 
  canvasRef,
  canvasContainerRef,
  onScroll,
  sequenceLength,
  starts = 'in', 
  ends,
}: ScrollerProps) {

  function changeOnWindowScroll() {
    const step = 100 / sequenceLength ;
    const percentScrolled = getPercentScrolled()
    const mapToIndex = Math.floor(percentScrolled / step);

    onScroll(mapToIndex);

    return () => {
      window.removeEventListener('scroll', changeOnWindowScroll);
    }
  }

  function getPercentScrolled() {
    const el = canvasContainerRef;
    const doc = document.documentElement;
    const clientOffsety = doc.scrollTop || window.pageYOffset;
    const elementHeight = el.clientHeight || el.offsetHeight;
    const clientHeight = doc.clientHeight;
    let target = el;
    let offsetY = 0;

    do {
      offsetY += target.offsetTop;
      target = target.offsetParent;
    } while (target && target !== window);

    let u = (clientOffsety - offsetY);
    let d = (elementHeight + clientHeight)

    if (starts === 'out') u += clientHeight;
    if (ends === 'in') d -= clientHeight;
    if (starts == 'in') d -= clientHeight;

    const value = u / d * 100;
    return value > 100 ? 100 : value < 0 ? 0 : value;
  }

  return { 
    onScroll: changeOnWindowScroll
  }
}