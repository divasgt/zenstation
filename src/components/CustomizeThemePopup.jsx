import { useState, useRef } from 'react'
import { IoIosClose } from 'react-icons/io'

export default function CustomizeThemePopup({
  setShowCustomizeThemePopup,
  setYtLink,
  setTheme,
  setCurrentIndex,
  setCustomBg,
  setIsHidden,
  customBg,
}) {
  const [inputText, setInputText] = useState("")
  const customBgInputRef = useRef(null)

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
              if (e.key==="Enter") {
                setYtLink(inputText)
                setTheme("custom")
                setCurrentIndex(0)
              }
            }}
          />
          <button
            className="go-btn" onClick={() => {
              setYtLink(inputText)
              setTheme("custom")
              setCurrentIndex(0)
          }}
          >Go</button>
        </div>
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
