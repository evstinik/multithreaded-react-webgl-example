import { Canvas } from '@react-three/offscreen'
import RenderWorker from './renderWorker?worker'
import { Leva, folder, useControls } from 'leva'
import { useSnapshot } from 'valtio'
import { store, syncStore } from './store'
import { useEffect } from 'react'

const renderWorker = new RenderWorker()

syncStore()

function App() {
  const snap = useSnapshot(store)

  const [_, set] = useControls(() => ({
    Instructions: folder({
      'Test case 1': { value: 'Edit name in inspector', editable: false },
      'Test case 2': { value: 'Click on object', editable: false }
    }),
    name: { value: snap.name, onChange: (v) => (store.name = v) },
    color: { value: snap.color, onChange: (v) => (store.color = v) }
  }))

  // Update leva, it does not use outer sources automatically
  useEffect(() => {
    set(snap)
  }, [snap])

  return (
    <div className='w-screen h-screen flex flex-row'>
      <Canvas
        className='w-full h-full flex-1'
        worker={renderWorker}
        fallback={null}
        camera={{ position: [2, 3, 4] }}
      />

      <div className='absolute inset-4 flex items-center justify-end pointer-events-none'>
        <div className='min-w-32 pointer-events-auto'>
          <Leva
            fill
            titleBar={{
              title: 'Inspector',
              filter: false
            }}
            oneLineLabels={true}
            theme={{
              colors: {
                highlight1: 'rgba(255, 255, 255, 0.9)'
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
