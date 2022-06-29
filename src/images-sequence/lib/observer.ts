export default function createObservable<MessageType>() {
  const listeners: Set<(msg: MessageType) => void> = new Set()
  type ListenerType = (msg: MessageType) => void
  enum EventType {
    FIRST_IMAGE_LOADED,
    PRIORITY_IMAGES_LOADED,
    ALL_IMAGES_LOADED
  }

  return {
    register(cb: ListenerType): () => void {
      listeners.add(cb)
      return () => {
        listeners.delete(cb)
      }
    },

    publish(msg: MessageType): void {
      listeners.forEach((cb) => cb(msg))
    },
    on(event: EventType, cb: ListenerType): void {

    },
    once(event: EventType, cb: ListenerType): void {

    },
    off(event: EventType, cb: ListenerType): void {

    }
  }
}



class EventEmitter {
  listeners = {}
  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }
  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }
  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = () => {
      fn();
      this.off(eventName, onceWrapper);
    }
    this.listeners[eventName].push(onceWrapper);
    return this;
  }
  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }
  removeListener(eventName, fn) {
    let lis = this.listeners[eventName];
    if (!lis) return this;
    for (let i = lis.length; i > 0; i--) {
      if (lis[i] === fn) {
        lis.splice(i, 1);
        break;
      }
    }
    return this;
  }
  emit(eventName, ...args) {
    let fns = this.listeners[eventName];
    if (!fns) return false;
    fns.forEach((f) => {
      f(...args);
    });
    return true;
  }
  listenerCount(eventName) {
    let fns = this.listeners[eventName] || [];
    return fns.length;
  }
  rawListeners(eventName) {
    return this.listeners[eventName];
  }
}