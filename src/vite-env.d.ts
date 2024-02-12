/// <reference types="vite/client" />

declare module '*.glb' {
  const content: string
  export default content
}
