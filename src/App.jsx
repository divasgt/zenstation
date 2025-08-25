import { useState, useEffect, useRef } from "react";
import Header from "./components/Header"
import themesLinks from "./themes";
import Pomodoro from "./components/pomodoro";
import TodoList from "./components/TodoList";
import homepageBgImage from "./assets/night-sky-stars1.jpg"
import "./aurora.css"

export default function App() {
  const [theme, setTheme] = useState("default")
  const [showCustomThemeSection, setShowCustomThemeSection] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [inputText, setInputText] = useState("")
  const [ytLink, setYtLink] = useState(randomVideo)
  const [customBg, setCustomBg] = useState(null)
  const customBgInputRef = useRef(null)

  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [videoTitle, setVideoTitle] = useState("")

  const [isPomodoroShown, setIsPomodoroShown] = useState(false)
  const [isTodoListShown, setIsTodoListShown] = useState(false)


  // derived variables
  let ytLinkId = "";
  if (ytLink.includes("?v=")) {
    ytLinkId =  ytLink.split("?v=")[1].substring(0,11)
  } else if (ytLink.includes(".be/")) {
    ytLinkId = ytLink.split(".be/")[1].substring(0,11)
  }
  // console.log(ytLinkId)

  // for fetching yt video title
  useEffect(() => {
    async function fetchVideoTitle(videoId) {
      const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      return data.title;
    }

    fetchVideoTitle(ytLinkId).then(title => {
      // console.log("Video Title:", title);
      setVideoTitle(title)
    });
  }, [ytLinkId])


  // load YouTube script
  useEffect(() => {
    // this below won't work.
    // const script = `<script src="https://www.youtube.com/iframe_api"></script>`
    // document.body.append(script)

    // we need to create dom node using document.createElement()
    if (!document.getElementById("youtube-api")) {
      const scriptElement = document.createElement("script");
      scriptElement.src = "https://www.youtube.com/iframe_api";
      scriptElement.id = "youtube-api";
      document.body.appendChild(scriptElement);
    }
  }, []);

  
  // create/destroy player when ytLinkId changes
  useEffect(() => {
    if (!ytLinkId) return

    function createPlayer() {
      playerRef.current = new window.YT.Player("player", {
        height: "100%",
        width: "100%",
        videoId: ytLinkId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          rel: 0,
          iv_load_policy: 3,
          fs: 0,
        },
        events: {
          onReady: (event) => {
            // Sync state with player
            // setIsMuted(event.target.isMuted())
            setIsPlaying(event.target.getPlayerState() === window.YT.PlayerState.PLAYING)

            // if mute button on, then start player muted
            isMuted ? playerRef.current.mute() : null
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true)
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false)
            }
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      window.onYouTubeIframeAPIReady = createPlayer
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [ytLinkId])

  
  // change ytLink when theme changes
  useEffect(() => {
    if (theme==="default") {
      setYtLink(randomVideo)
      ytLinkId = 0
    }
    else if (theme!=="custom") setYtLink(themesLinks[theme][currentIndex])
  },[theme, currentIndex])


  // useEffect(() => {
  //   if (!customBg) document.body.style.backgroundImage=``
  //   if (customBg) document.body.style.backgroundImage=`url(${customBg})`
  // }, [customBg])


  function randomVideo() {
    return ""
  }

  function togglePlay() {
    if (!playerRef.current) return

    if (playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }

    setIsPlaying(prev => !prev)
  }

  function toggleMute() {
    if (!playerRef.current) return

    if (playerRef.current.isMuted()) {
      playerRef.current.unMute()
    } else {
      playerRef.current.mute()
    }

    setIsMuted(prev => !prev)
  }

  function handleNextOrPrevious(event) {
    if (event==="previous") {
      // check if currentIndex is 0
      if (currentIndex === 0) {
        setCurrentIndex(themesLinks[theme].length - 1)
      } else {
        setCurrentIndex(prev => prev-1)
      }
    } else if (event==="next") {
      // check if currentIndex is last index of current theme's array
      if (currentIndex === themesLinks[theme].length - 1) {
        setCurrentIndex(0)
      } else {
        setCurrentIndex(prev => prev+1)
      }
    }
  }

  
  return (
  <>
  <div className="body-wrapper-div">

    {/* div for background */}
    <div className="bg-div" style={
      !customBg ?
        {backgroundImage: `radial-gradient(circle 700px at 50% 350px, rgba(139,92,246,0.4), transparent)`} :
        {
          backgroundImage: `url(${customBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }
    }></div>



    
    <Header setTheme={setTheme} setShowCustomThemeSection={setShowCustomThemeSection} setIsPomodoroShown={setIsPomodoroShown} setCurrentIndex={setCurrentIndex} setIsTodoListShown={setIsTodoListShown} />
    <Header setTheme={setTheme} setShowCustomThemeSection={setShowCustomThemeSection} setIsPomodoroShown={setIsPomodoroShown} setCurrentIndex={setCurrentIndex} setIsTodoListShown={setIsTodoListShown} />

    <Pomodoro isPomodoroShown={isPomodoroShown} />
    <TodoList isTodoListShown={isTodoListShown} />

    {!ytLinkId && 
    <div className="homepage-info-div">
      <h1><span style={{textShadow: "none"}}>🌌</span> Chill Space</h1>
      <p>Your space to focus, study, work, relax, or just chill</p>
      <p>Choose from many themes above or create your theme</p>
    </div>
    }
    
    {showCustomThemeSection &&
    <section className="custom-theme-section">
      <button className="close-btn" onClick={() => setShowCustomThemeSection(prev => !prev)} >
        <img src="https://img.icons8.com/?size=100&id=83149&format=png&color=ffffff" alt="close-icon" style={{width: "18px"}} />
      </button>

      <div className="yt-link-div">
        <p>Enter any youtube video link</p>

        <div className="input-and-btn-div">
          <input type="text" placeholder="Enter a youtube link" value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              e.key==="Enter" ? setYtLink(inputText) : null
            }}
          />
          <button className="go-btn" onClick={() => setYtLink(inputText)}>
            Go
          </button>
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
    </section>
    }

    {ytLinkId && (
    <>
      <div className="player-info-and-controls">
        <div className="player-controls">
          <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
          <button onClick={toggleMute}>{isMuted ? "🔇" : "🔊"}</button>
          <button onClick={() => handleNextOrPrevious("previous")}>⏮</button>
          <button onClick={() => handleNextOrPrevious("next")}>⏭</button>
          <button onClick={() => setIsHidden(prev => !prev)}>{isHidden ? "🎥 Video Mode" : "🎵 Audio Mode"}</button>
        </div>
        <div className="video-title">
          <span>Now Playing: </span>
          {videoTitle}</div>
      </div>

      <div className="player-wrapper" tabIndex={-1} style={isHidden ? {display: "none"} : null}>
        <div tabIndex={-1} id="player"></div>
        {/* {ytLinkId && <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ytLinkId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>} */}
      </div>
    </>
    )}
  </div>
  </>  
  )
}