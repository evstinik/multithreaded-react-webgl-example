import { Leva, folder, useControls } from 'leva'
import { FC, useEffect } from 'react'

export interface InspectorProps {
  name: string
  color: string
  onNameChange: (name: string) => void
  onColorChange: (color: string) => void
}

export const Inspector: FC<InspectorProps> = (props) => {
  const { name, color, onNameChange, onColorChange } = props

  const [_, set] = useControls(() => ({
    Instructions: folder({
      'Test case 1 (main -> render)': {
        value: 'Edit name in inspector. It should update label in 3D scene.',
        editable: false
      },
      'Test case 2 (render -> main)': {
        value: 'Click on object. It should invert color and name in 3D scene and inspector.',
        editable: false
      }
    }),
    name: { value: name, onChange: onNameChange },
    color: { value: color, onChange: onColorChange }
  }))

  // Update leva, it does not use outer sources automatically
  useEffect(() => {
    set({ name, color })
  }, [name, color])

  return (
    <div className='absolute inset-4 flex items-center justify-end pointer-events-none'>
      <div className='min-w-32 max-w-64 pointer-events-auto'>
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
  )
}
