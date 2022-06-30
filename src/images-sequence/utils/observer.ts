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

  function emit(msg: MessageType): void {
    return Object.entries(listeners).forEach(([, cbs]) => {
      cbs.map(cb => cb(msg))
    })
  }

  function on(event: EventType, cbs: ListenerType[]): void {
    add(event, cbs)
  }

  function once(event: EventType, cb: () => void): void {
    function callOnce() {
      cb()
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
