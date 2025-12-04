import { useEffect, useRef } from "react"

export default function Settings({settings, setSettings, isSettingsShown, setIsSettingsShown}) {
  const settingsRef = useRef(null)
  
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings))
  }, [settings])

  // handle clicks outside the settings popup
  useEffect(() => {
    // If settings popup is shown and click is outside the popup
    function handleClickOutside(event) {
      const settingsButton = document.querySelector(".settings-btn")
      if (isSettingsShown && settingsRef.current && !settingsRef.current.contains(event.target) && !settingsButton.contains(event.target)) {
        setIsSettingsShown(false)
      }
    }

    if (isSettingsShown) {
      document.addEventListener("click", handleClickOutside, true)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [isSettingsShown, setIsSettingsShown])

  
  function toggleSetting(settingId) {
    setSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId]
    }))
    // Remove the direct localStorage.setItem call here, if we put here, it will run immediately and set the previous settings state to localstorage, because updating state will not happen immediately. So useEffect is better way to handle this
  }

  async function handleShareWebsite() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Zen Station",
          text: "Check out this cool website - Zen Station!",
          // url: window.location.href,
          url: "https://zenstation.netlify.app",
        })
      } catch (err) {
        console.error("Error on share button", err)
      }
    } else {
      // console.log("Sharing is not supported on this device or browser.")
      try {
        await navigator.clipboard.writeText("https://zenstation.netlify.app")
        alert("Link copied to clipboard!")
      } catch (err) {
        console.error("Error copying to clipboard", err)
      }
    }
  }
  
  return (
  <div
    className="settings-popup"
    style={!isSettingsShown ? {visibility: "hidden"} : {}}
    ref={settingsRef}
  >
    <h2>Settings</h2>

    <div className="settings-div">
      <label>
        <input
          type="checkbox"
          checked={settings["show-on-hover-header"]}
          onChange={() =>toggleSetting("show-on-hover-header")}
        />
        Show header on hover
      </label>

      <label>
        <input
          type="checkbox"
          checked={settings["show-on-hover-bottom-bar"]}
          onChange={() => toggleSetting("show-on-hover-bottom-bar")}
        />
        Show bottom bar on hover
      </label>
    </div>
    
    <div className="separater-div"></div>

    <div className="about-div">
      <div className="buttons-container">
        <button
          className="share-btn hover-fade"
          onClick={handleShareWebsite}
        >Share</button>
        <button>
          <a className="coffee-btn hover-fade" href="#">Buy me a coffee</a>
        </button>
      </div>

      <p>Made with ❤️ by <a href="https://x.com/divas_v" target="_blank" rel="noopener noreferrer" className="hover-fade" style={{marginInline: "5px"}}> divas</a></p>
    </div>
  </div>
  )
}