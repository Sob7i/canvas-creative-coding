export enum EventType {
  FIRST_IMAGE_LOADED = 'FIRST_IMAGE_LOADED',
  PRIORITY_IMAGES_LOADED = 'PRIORITY_IMAGES_LOADED',
  ALL_IMAGES_LOADED = 'ALL_IMAGES_LOADED'
}

export default function createObservable<MessageType>() {
  type ListenerType = (msg: MessageType) => void
  const listeners: Record<EventType, [ListenerType]> | {} = {}

  function add(event: EventType, cbs: ListenerType[]): () => void {
    listeners[event] = cbs;

    return () => {
      remove(event)
    }
  }

  function emit(event: EventType, msg?: MessageType): boolean {
    const cbs = listeners[event]
    if (!cbs) return false;

    cbs.forEach((cb: ListenerType) => cb(msg))
    return true
  }

  function on(event: EventType, cbs: ListenerType[]): void {
    add(event, cbs)
  }

  function once(event: EventType, cb: (msg: MessageType) => void): void {
    function callOnce(msg: MessageType) {
      cb(msg)
      return () => {
        remove(event)
      }
    }

    listeners[event] = [callOnce]
  }

  function off(event: EventType): void {
    remove(event)
  }

  function remove(event: EventType): boolean {
    return delete listeners[event]
  }

  return { add, emit, on, once, off }
}

export const loader = createObservable<[] | HTMLImageElement[]>()
