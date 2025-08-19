import { use, useState } from "react";
import Header from "./components/Header"

export default function App() {
  const [inputText, setInputText] = useState("")
  const [ytlink, setYtlink] = useState("")

  // derived values
  let ytlinkId = "";
  if (ytlink.includes("?v=")) {
    ytlinkId =  ytlink.split("?v=")[1].substring(0,11)
  } else if (ytlink.includes(".be/")) {
    ytlinkId = ytlink.split(".be/")[1].substring(0,11)
  }


  console.log(ytlinkId)

  
  return (
  <>
    <Header />

    <section className="enter-link-section">
      <p>Enter any <span style={{color: "red"}}>Youtube</span> video link</p>

      <div className="input-and-btn-div">
        <input type="text" placeholder="Enter a youtube link" value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            e.key==="Enter" ? setYtlink(inputText) : null
          }}
        />
        <button className="go-btn" onClick={() => {
          setYtlink(inputText)
          console.log(ytlink)
        }}>
        Go</button>
      </div>

    </section>

    <div className="yt-player">
      {ytlinkId && <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ytlinkId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
    </div>
  </>  
  )
}