import { useEffect, useState } from "react"

export default function Header({theme, setTheme, setIsCustomTheme}) {
  const [isFullScreen, setIsFullScreen] = useState(false)

  // useEffect(() => {
    
  // })

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
        <li><a className="home-nav-link" onClick={() => setTheme("default")}>😎</a></li>
        <li><a onClick={() => setTheme("lofi")}>Lofi</a></li>
        <li><a onClick={() => setTheme("cafe")}>Cafe</a></li>
        <li><a onClick={() => setTheme("library")}>Library</a></li>
        <li><a onClick={() => setTheme("relax")}>Relax</a></li>
        <li><a onClick={() => setIsCustomTheme(prev => !prev)}>Create my vibe</a></li>
        {/* on clicking above, pause video if playing and show entering link popup */}
      </ul>
    </nav>

    <div className="header-right-div">
      <button onClick={toggleFullScreen} className="fullscreen-btn">
        {/* <img src="https://img.icons8.com/?size=100&id=98066&format=png&color=ffffff" alt="fullscreen-icon" style={{width: "20px", marginTop: "2px"}} /> */}
        {/* <img src="https://img.icons8.com/?size=100&id=hafLDNJlLQnR&format=png&color=ffffff" alt="" style={{width: "22px", marginTop: "2px"}} /> */}
        <img src="https://img.icons8.com/?size=100&id=ljlb4da7psfA&format=png&color=ffffff" alt="fullscreen-icon" style={{width: "15px", marginTop: "2px"}} />
      </button>
    </div>
  </header>
  )
}