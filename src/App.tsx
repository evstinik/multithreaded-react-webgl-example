import { useSnapshot } from 'valtio'
import { store, syncStore } from './store'
import { Canvas } from './webgl'
import { Inspector, Layout } from './dom'

syncStore()

const setName = (name: string) => (store.name = name)
const setColor = (color: string) => (store.color = color)

export const App = () => {
  const snapshot = useSnapshot(store)

  return (
    <Layout>
      <Canvas />
      <Inspector
        name={snapshot.name}
        onNameChange={setName}
        color={snapshot.color}
        onColorChange={setColor}
      />
    </Layout>
  )
}
