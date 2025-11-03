import { useState, useRef, useCallback } from 'react';

export function useDraggable(initialPosition = { x: 100, y: 100 }) {
  const [position, setPosition] = useState(initialPosition)
  const elementRef = useRef(null)

  const handleMouseDown = useCallback((e) => {
    if (elementRef.current) {
      const startX = e.clientX
      const startY = e.clientY
      const startLeft = elementRef.current.offsetLeft
      const startTop = elementRef.current.offsetTop

      const handleMouseMove = (moveEvent) => {
        // startLeft + distance moved in x
        const newLeft = startLeft + moveEvent.clientX - startX

        // startTop + distance moved in y
        const newTop = startTop + moveEvent.clientY - startY

        setPosition({ x: newLeft, y: newTop })
      }

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const draggableStyle = {
    position: 'absolute',
    top: `${position.y}px`,
    left: `${position.x}px`,
  }

  return {
    elementRef,
    handleMouseDown,
    draggableStyle,
  }
}
