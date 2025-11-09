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
  
  return (
  <div
    className="settings-popup"
    style={!isSettingsShown ? {visibility: "hidden"} : {}}
    ref={settingsRef}
  >
    <p>Settings</p>

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
  </div>
  )
}