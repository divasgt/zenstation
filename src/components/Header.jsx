import { useEffect, useState } from "react"

export default function Header({ setTheme, setIsCustomTheme, setIsPomodoroShown, setCurrentIndex }) {
  const [isFullScreen, setIsFullScreen] = useState(false)

  function toggleFullScreen() {
    if (isFullScreen) {
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
        <li><button className="home-nav-link" onClick={() => setTheme("default")}>😎</button></li>
        <li><button onClick={() => handleThemeClick("lofi")}>Lofi</button></li>
        <li><button onClick={() => handleThemeClick("cafe")}>Cafe</button></li>
        <li><button onClick={() => handleThemeClick("library")}>Library</button></li>
        <li><button onClick={() => handleThemeClick("relax")}>Relax</button></li>

        {/* on clicking below button, pause video if playing and show entering link popup */}
        <li><button onClick={() => setIsCustomTheme(prev => !prev)}>Create my vibe</button></li>
      </ul>
    </nav>

    <div className="header-right-div">

      <button className="todo-list-btn">
        <img src="https://img.icons8.com/?size=100&id=11266&format=png&color=ffffff" alt="todo-list" />
      </button>
      <div className="tooltip todo-list-tooltip">Todo List</div>
      
      <button className="pomodoro-btn" onClick={() => setIsPomodoroShown(prev => !prev)}>
        <img className="pomodoro-clock-img" src="https://img.icons8.com/?size=100&id=16153&format=png&color=ffffff" alt="pomodoro-clock-icon" />
      </button>
      <div className="tooltip pomodoro-tooltip">Pomodoro Timer</div>

      <button onClick={toggleFullScreen} className="fullscreen-btn">
        <img className="fullscreen-img" src="https://img.icons8.com/?size=100&id=ljlb4da7psfA&format=png&color=ffffff" alt="fullscreen-icon" />
      </button>
      <div className="tooltip fullscreen-tooltip">Fullscreen</div>

      <button className="about-btn">❤</button>
      <div className="tooltip about-tooltip">About</div>
      
    </div>
  </header>
  )
}