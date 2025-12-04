import { useState, useRef } from 'react'
import { IoIosClose } from 'react-icons/io'
import getIdfromLink from '../utils/getIdFromLink'

export default function CustomizeThemePopup({
  setShowCustomizeThemePopup,
  setYtLinkId,
  setTheme,
  setCurrentIndex,
  setCustomBg,
  setIsHidden,
  customBg,
}) {
  const [inputText, setInputText] = useState("")
  const [ytLinkError, setYtLinkError] = useState(null)
  const customBgInputRef = useRef(null)

  function handleGoClick() {
    const newId = getIdfromLink(inputText)
    if (newId) {
      setYtLinkId(newId)
      setTheme("custom")
      setCurrentIndex(0)
      setYtLinkError(null)
    } else {
      setYtLinkError("Invalid YouTube link. Please check and try again.")
    }
  }

  return (
    <div className="customize-theme-popup">
      <button className="close-btn" onClick={() => setShowCustomizeThemePopup(false)} >
        <IoIosClose style={{width: "30px", height: "30px"}} />
      </button>

      <div className="yt-link-div">
        <p>Enter any youtube video link</p>

        <div className="input-and-btn-div">
          <input type="text" placeholder="Enter a youtube link" value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGoClick()
            }}
          />
          <button className="go-btn" onClick={handleGoClick}>
            Go
          </button>
        </div>
        {ytLinkError && <p className="error-message">{ytLinkError}</p>}
      </div>

      <div className="custom-bg-div">
        <p>Upload Custom background Image</p>

        <div className="input-and-btn-div">
          <input ref={customBgInputRef} type="file" name="custom-bg-input" id="custom-bg-input" accept="image/*" onChange={event => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(event.target.files[0])
            // when reading as data url is complete, the onload event is triggered, and fileReader.result contains the dataURL

            // onload property should be assigned a function, it itself should not be called by ()
            fileReader.onload = () => {
              setCustomBg(fileReader.result)
              // also hide playing video
              setIsHidden(true)
            }
          }}/>

          {customBg &&
          <button className="reset-bg-btn" onClick={() => {
            setCustomBg("")
            setIsHidden(false)
            customBgInputRef.current.value = ""
          }}>Reset Background</button>
          }
        </div>
      </div>
      {/* <p>or Enter image link</p>
      <input type="text" /> */}
    </div>
  )
}
