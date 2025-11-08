import { useEffect, useState } from "react"
import logoImg from "../assets/milky-way_1f30c.png"
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { IoIosArrowDown } from "react-icons/io";
import { LuAlarmClock } from 'react-icons/lu';
import { FaHeart } from "react-icons/fa";
import { RiExpandDiagonalLine } from 'react-icons/ri';
import { PiArrowsInSimple } from 'react-icons/pi';
import { LiaStickyNote } from 'react-icons/lia';

export default function Header({
  themesNames,
  theme,
  setTheme,
  setShowCustomThemeSection,
  setIsStickyNoteShown,
  setIsPomodoroShown,
  setIsTodoListShown,
  setCurrentIndex
}) {
  const [themesDropdownShown, setThemesDropdownShown] = useState(false)
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
    
    
    <ul>
      <li className="home-nav-item">
        <button className="home-nav-link" onClick={() => handleThemeClick("default")}>
          <img src={logoImg} alt="Logo Icon" />
        </button>
      </li>

      {/* theme name buttons */}
      {themesNames.slice(1).map(themeName => (
        <li key={themeName} className="desktop-nav-item">
          <button onClick={(e) => handleThemeClick(e.currentTarget.textContent)}>
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </button>
        </li>
      ))}

      <li className="desktop-nav-item">
        <button onClick={() => {
          setShowCustomThemeSection(prev => !prev)
        }}>Create my theme</button>
      </li>
      
      
      <li className="mobile-items">
        <div className="themes-menu-container" onBlur={() => setTimeout(() => setThemesDropdownShown(false), 150)}>
          <button className="themes-btn" onClick={() => setThemesDropdownShown(prev => !prev)}>
            <span>Themes</span>
            <IoIosArrowDown style={{width: "14px", height: "14px"}} />
          </button>

          <ul className="themes-dropdown" style={themesDropdownShown ? {visibility: "visible", opacity: "100%", scale: "100%"} : {}}>
            {/* theme name buttons */}
            {themesNames.slice(1).map(themeName => (
              <li key={themeName} className="mobile-nav-item">
                <button onClick={(e) => handleThemeClick(e.currentTarget.textContent)}>
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </button>
              </li>
            ))}

            <div></div>
            <li className="mobile-nav-item">
              <button onClick={() => {setShowCustomThemeSection(prev => !prev); setThemesDropdownShown(false)}}>Create my theme</button>
            </li>
          </ul>

        </div>
      </li>

    </ul>


    <div className="header-right-div">

      <div className="widgets-menu-container" onBlur={() => setTimeout(() => setWidgetsDropdownShown(false), 150)}>
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
          <button className="sticky-note-btn" onClick={() => setIsStickyNoteShown(prev => !prev)}>
            <LiaStickyNote style={{width: "18px", height: "18px"}} />
            Sticky Note
          </button>
          
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