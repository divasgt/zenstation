import { useState, useEffect, useRef } from "react";
import Header from "./components/Header"
import themesLinks from "./themes";

export default function App() {
  const [theme, setTheme] = useState("default")
  const [isCustomTheme, setIsCustomTheme] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [inputText, setInputText] = useState("")
  const [ytLink, setYtLink] = useState(randomVideo)

  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [videoTitle, setVideoTitle] = useState("")


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

  // change ytLink when theme changes
  useEffect(() => {
    if (theme==="default") setYtLink(randomVideo)
    else if (theme!=="custom") setYtLink(themesLinks[theme][currentIndex])
  },[theme, currentIndex])

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
            setIsMuted(event.target.isMuted())
            setIsPlaying(event.target.getPlayerState() === window.YT.PlayerState.PLAYING)
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
    <Header theme={theme} setTheme={setTheme} setIsCustomTheme={setIsCustomTheme} />

    {isCustomTheme && (
      <section className="enter-link-section">
        <p>Enter any Youtube video link</p>

        <div className="input-and-btn-div">
          <input type="text" placeholder="Enter a youtube link" value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              e.key==="Enter" ? setYtLink(inputText) : null
            }}
          />
          <button className="go-btn" onClick={() => {
            setYtLink(inputText)
            // console.log(ytLink)
          }}>
          Go</button>
        </div>
      </section>
    )}

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

      <div className="player-wrapper" style={isHidden ? {display: "none"} : null}>
        <div id="player"></div>
        {/* {ytLinkId && <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ytLinkId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>} */}
      </div>
    </>
    )}
  </>  
  )
}