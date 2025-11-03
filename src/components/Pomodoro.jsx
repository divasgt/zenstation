import { useRef, useState, useEffect } from "react"
import { IoIosClose } from "react-icons/io"
import { useDraggable } from "../hooks/useDraggable"

export default function Pomodoro({isPomodoroShown, setIsPomodoroShown}) {
  const [timer, setTimer] = useState(1500)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const intervalIdRef = useRef(null)
  const { elementRef, handleMouseDown, draggableStyle } = useDraggable({ x: window.innerWidth - 180, y: window.innerHeight - 240 })

  function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = timeInSeconds % 60

    return (
      (hours>=1 ? `${String(hours).padStart(2,0)} : ` : "")
      + `${String(minutes).padStart(2,0)} : ${String(seconds).padStart(2,0)}` 
    )
    
  }

  function handlePomodoro() {
    if (!isTimerRunning) {
      intervalIdRef.current = setInterval(() => {
        setTimer(prev => prev-1)
      }, 1000)
    } else {
      clearInterval(intervalIdRef.current)
      setTimer(1500)
    }

    setIsTimerRunning(prev => !prev)
  }
  
  return (
    <div ref={elementRef} className="pomodoro-div" style={!isPomodoroShown ? {display: "none"} : draggableStyle}>
      <div className="drag-handle" onMouseDown={handleMouseDown}><div className="drag-line"></div></div>
      <button className="close-btn" onClick={() => setIsPomodoroShown(false)}>
        <IoIosClose style={{width: "25px", height: "25px"}} />
      </button>
      
      <p>Pomodoro timer</p>
      <div className="timer">{formatTime(timer)}</div>
      <div>
      <button className="start-btn" onClick={handlePomodoro}>{!isTimerRunning ? "Start" : "Stop"}</button>
      </div>
      
      <button onClick={() => setTimer(prev => prev+300)}>+ 5:00</button>
      {!isTimerRunning && <button onClick={() => setTimer(prev => prev-300)}>- 5:00</button>}
    </div>
  )
}
