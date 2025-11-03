import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDraggable } from "../hooks/useDraggable";

export default function StickyNote({isStickyNoteShown, setIsStickyNoteShown}) {
  const [noteText, setNoteText] = useState("Type here!")
  const noteRef = useRef(null)
  const [size, setSize] = useState({ width: 180, height: 150 })
  const { elementRef, handleMouseDown: handleDragMouseDown, draggableStyle } = useDraggable({ x:window.innerWidth - 500, y:70 })

  // used this useEffect, because when using onInput in the contentEditable div, the cursor position always goes to starting of text because of rerender everytime
  useEffect(() => {
    if (noteRef.current && noteText !== noteRef.current.textContent) {
      noteRef.current.textContent = noteText
    }
  }, [noteText, isStickyNoteShown]) // Also run on isStickyNoteShown to set content when note becomes visible

  const handleResizeMouseDown = (e) => {
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = size.width
    const startHeight = size.height

    const handleMouseMove = (moveEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX)
      const newHeight = startHeight + (moveEvent.clientY - startY)
      setSize({
        width: Math.max(130, newWidth), // Enforce min-width
        height: Math.max(50, newHeight), // Enforce min-height
      })
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }
  
  return (
    <div
      ref={elementRef}
      className="sticky-note bg-blur-div"
      style={!isStickyNoteShown ? {display: "none"} : {...draggableStyle, width: `${size.width}px`, height: `${size.height}px`}}
    >
      <div className="drag-handle" onMouseDown={handleDragMouseDown}><div className="drag-line"></div></div>
      <button className="close-btn" onClick={() => setIsStickyNoteShown(false)}>
        <IoIosClose style={{width: "25px", height: "25px"}} />
      </button>

      {/* <p>Sticky Note</p> */}
      <div
        ref={noteRef}
        contentEditable="true"
        suppressContentEditableWarning={true}
        onInput={(e) => setNoteText(e.currentTarget.textContent || "")}
        // The initial content is now set by the useEffect
      ></div>
      
      <div className="resize-handle" onMouseDown={handleResizeMouseDown}>
        {/* <LuSquareArrowDownRight /> */}
        {/* <LiaExternalLinkSquareAltSolid/> */}
      </div>
    </div>
  )
}
