import { render } from '@react-three/offscreen'
import Scene from './Scene'
import { syncStore } from './store'

syncStore()

render(<Scene />)
