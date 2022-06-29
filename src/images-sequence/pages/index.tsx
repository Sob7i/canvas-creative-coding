import createObservable, { EventType } from '../lib/observer'

export default function Home() {
  const observableFunction = createObservable<string>()
  observableFunction.add(
    EventType.ALL_IMAGES_LOADED,
    () => console.log('added a listener')
  )

  return (
    <div>
      <main >
        <div>
        </div>
      </main>
    </div>
  )
}
