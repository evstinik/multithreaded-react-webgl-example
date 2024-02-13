import { store } from '../store'
import { useSnapshot } from 'valtio'
import { invertColor } from '../utils'
import { Label, Stage, Suzi } from './components'

const invertAttributes = () => {
  store.color = invertColor(store.color)
  store.name = `Inverted ${store.name}`
}

export const Scene = () => {
  const snapshot = useSnapshot(store)

  return (
    <Stage>
      <Suzi color={snapshot.color} onClick={invertAttributes} />
      <Label>{snapshot.name}</Label>
    </Stage>
  )
}
