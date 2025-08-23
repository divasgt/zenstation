import { useEffect, useState } from "react"

export default function Header({ setTheme, setIsCustomTheme, setIsPomodoroShown }) {
  const [isFullScreen, setIsFullScreen] = useState(false)

  function toggleFullScreen() {
    if (isFullScreen) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()  
    }
    setIsFullScreen(prev => !prev)
  }
  
  return (
  <header>
    <nav>
      <ul>
        <li><button className="home-nav-link" onClick={() => setTheme("default")}>😎</button></li>
        <li><button onClick={() => setTheme("lofi")}>Lofi</button></li>
        <li><button onClick={() => setTheme("cafe")}>Cafe</button></li>
        <li><button onClick={() => setTheme("library")}>Library</button></li>
        <li><button onClick={() => setTheme("relax")}>Relax</button></li>

        {/* on clicking below button, pause video if playing and show entering link popup */}
        <li><button onClick={() => setIsCustomTheme(prev => !prev)}>Create my vibe</button></li>
      </ul>
    </nav>

    <div className="header-right-div">
      
      <button className="pomodoro-clock-btn" onClick={() => setIsPomodoroShown(prev => !prev)}>
        <img className="pomodoro-clock-img" src="https://img.icons8.com/?size=100&id=16153&format=png&color=ffffff" alt="pomodoro-clock-icon" />
      </button>
      <button onClick={toggleFullScreen} className="fullscreen-btn">
        {/* <img src="https://img.icons8.com/?size=100&id=98066&format=png&color=ffffff" alt="fullscreen-icon" style={{width: "20px", marginTop: "2px"}} /> */}
        {/* <img src="https://img.icons8.com/?size=100&id=hafLDNJlLQnR&format=png&color=ffffff" alt="" style={{width: "22px", marginTop: "2px"}} /> */}
        <img className="fullscreen-img" src="https://img.icons8.com/?size=100&id=ljlb4da7psfA&format=png&color=ffffff" alt="fullscreen-icon" />
      </button>
    </div>
  </header>
  )
}