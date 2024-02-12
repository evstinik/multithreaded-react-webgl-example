import { Canvas } from '@react-three/offscreen'
import { lazy } from 'react'
import RenderWorker from './renderWorker?worker'
import { Leva, useControls } from 'leva'

const Scene = lazy(() => import('./Scene'))
const renderWorker = new RenderWorker()

function App() {
  const { name, color } = useControls({
    name: 'Suzi',
    color: '#FFA500'
  })

  return (
    <div className='w-screen h-screen'>
      <Leva
        titleBar={{
          drag: false,
          filter: false,
          title: 'Inspector'
        }}
        neverHide
        oneLineLabels={true}
        isRoot
      />
      <Canvas
        className='w-full h-full'
        worker={renderWorker}
        fallback={<Scene />}
        camera={{ position: [2, 3, 4] }}
      />
    </div>
  )
}

export default App
