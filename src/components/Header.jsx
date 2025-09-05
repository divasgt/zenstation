import { useEffect, useState } from "react"
import logoImg from "../assets/milky-way_1f30c.png"

export default function Header({ setTheme, setShowCustomThemeSection, setIsPomodoroShown, setIsTodoListShown, setCurrentIndex }) {
  const [isFullScreen, setIsFullScreen] = useState(false)

  function toggleFullScreen() {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()  
    }
    setIsFullScreen(prev => !prev)
  }

  function handleThemeClick(text) {
    setTheme(text.toLowerCase())
    setCurrentIndex(0)
  }
  
  return (
  <header>
    <nav>
      <ul>
        <li><button className="home-nav-link" onClick={() => handleThemeClick("default")}>
          <img src={logoImg} alt="Logo Icon" />
        </button></li>
        <li><button onClick={() => handleThemeClick("lofi")}>Lofi</button></li>
        <li><button onClick={() => handleThemeClick("cafe")}>Cafe</button></li>
        <li><button onClick={() => handleThemeClick("library")}>Library</button></li>
        <li><button onClick={() => handleThemeClick("relax")}>Relax</button></li>

        {/* on clicking below button, pause video if playing and show entering link popup */}
        <li><button onClick={() => {
          setShowCustomThemeSection(prev => !prev)
          handleThemeClick("custom")
        }
        }>Create my theme</button></li>
      </ul>
    </nav>

    <div className="header-right-div">

      <button className="todo-list-btn" onClick={() => setIsTodoListShown(prev => !prev)}>
        <img src="https://img.icons8.com/?size=100&id=11266&format=png&color=ffffff" alt="todo-list" />
      </button>
      <div className="tooltip todo-list-tooltip">Todo List</div>
      
      <button className="pomodoro-btn" onClick={() => setIsPomodoroShown(prev => !prev)}>
        <img className="pomodoro-clock-img" src="https://img.icons8.com/?size=100&id=16153&format=png&color=ffffff" alt="pomodoro-clock-icon" />
      </button>
      <div className="tooltip pomodoro-tooltip">Pomodoro Timer</div>

      <button onClick={toggleFullScreen} className="fullscreen-btn">
        {isFullScreen ?
          <img src="https://img.icons8.com/material-outlined/24/FFFFFF/compress.png" alt="compress"/> :
          <img className="fullscreen-img" src="https://img.icons8.com/forma-regular-sharp/24/FFFFFF/decompress.png" alt="decompress"/>
          // <img src="https://img.icons8.com/sf-regular/48/FFFFFF/expand.png" alt="expand"/>
          // <img style={{width: "15px"}} className="fullscreen-img" src="https://img.icons8.com/?size=100&id=ljlb4da7psfA&format=png&color=ffffff" alt="fullscreen-icon" />
          // <img className="fullscreen-img" src="https://img.icons8.com/material-outlined/24/FFFFFF/full-screen--v1.png" alt="full-screen--v1"/>
        }
      </button>
      <div className="tooltip fullscreen-tooltip">Fullscreen</div>

      <button className="about-btn">❤</button>
      <div className="tooltip about-tooltip">About</div>
      
    </div>
  </header>
  )
}