import { useEffect, useState } from "react"
import logoImg from "../assets/milky-way_1f30c.png"
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { LuAlarmClock } from 'react-icons/lu';
import { FaHeart } from "react-icons/fa";
import { RiExpandDiagonalLine } from 'react-icons/ri';
import { PiArrowsInSimple } from 'react-icons/pi';

export default function Header({ theme, setTheme, setShowCustomThemeSection, setIsPomodoroShown, setIsTodoListShown, setCurrentIndex }) {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [widgetsDropdownShown, setWidgetsDropdownShown] = useState(false)

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
    { theme!==("default")  && <div className="header-bg-blur-div"></div> }
    
    
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

      <div className="widgets-menu-container" onBlur={() => setWidgetsDropdownShown(false)}>
        <button className="widgets-btn" onClick={() => setWidgetsDropdownShown(prev => !prev)}>
          <span className="plus-icon">+</span>
          <span>widgets</span>
        </button>

        {/* Widgets dropdown menu */}
        <div
          className="widgets-dropdown"
          style={
            widgetsDropdownShown
            ? {visibility: "visible", opacity: "100%", scale: "100%"}
            : {}
          }
        >
          <button className="todo-list-btn" onClick={() => setIsTodoListShown(prev => !prev)}>
            <AiOutlineUnorderedList style={{width: "18px", height: "18px", marginBottom: "1px"}} />
            Todo list
          </button>

          <button className="pomodoro-btn" onClick={() => setIsPomodoroShown(prev => !prev)}>
            <LuAlarmClock style={{width: "18px", height: "18px"}} />
            Pomodoro timer
          </button>
        </div>
      </div>

      <div className="icon-container">
        <button onClick={toggleFullScreen} className="fullscreen-btn">
          {isFullScreen ?
            <PiArrowsInSimple style={{width: "20px", height: "20px", marginTop: "1px"}} /> :
            <RiExpandDiagonalLine style={{width: "18px", height: "18px"}} />
          }
        </button>
        <div className="tooltip fullscreen-tooltip">Fullscreen</div>
      </div>

      <div className="icon-container">
        <button className="about-btn">
          <FaHeart style={{width: "14px", height: "14px"}} />
        </button>
        <div className="tooltip about-tooltip">About</div>
      </div>
      
    </div>
  </header>
  )
}