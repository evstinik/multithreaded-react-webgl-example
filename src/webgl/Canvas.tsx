import { Canvas as OffscreenCanvas } from '@react-three/offscreen'
import RenderWorker from './renderWorker?worker'

const renderWorker = new RenderWorker()

export const Canvas = () => {
  return (
    <OffscreenCanvas
      className='w-full h-full flex-1'
      worker={renderWorker}
      fallback={null}
      camera={{ position: [2, 3, 4] }}
    />
  )
}
