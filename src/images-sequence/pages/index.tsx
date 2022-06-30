import createObservable, { EventType } from '../utils/observer'

export default function Home() {
  const observableFunction = createObservable<string>()

  observableFunction.once(
    EventType.FIRST_IMAGE_LOADED,
    () => console.log('fire once: ', EventType.FIRST_IMAGE_LOADED)
  )

  observableFunction.emit(EventType.FIRST_IMAGE_LOADED)
  observableFunction.emit(EventType.PRIORITY_IMAGES_LOADED)
  observableFunction.emit(EventType.ALL_IMAGES_LOADED)

  return (
    <div>
      <main >
        <div>
        </div>
      </main>
    </div>
  )
}
