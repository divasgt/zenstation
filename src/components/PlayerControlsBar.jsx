import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVideo, FaMusic } from 'react-icons/fa'
import { IoVolumeHigh, IoVolumeMute } from 'react-icons/io5'

export default function PlayerControlsBar({
  isPlaying,
  isMuted,
  isHidden,
  videoTitle,
  settings,
  handleNextOrPrevious,
  togglePlay,
  toggleMute,
  setIsHidden,
}) {
  return (
    <>
      <div className={`player-info-and-controls ${settings["show-on-hover-bottom-bar"] && "show-on-hover"}`}>
        <div className="player-controls">
          <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={() => handleNextOrPrevious("previous")} aria-label="Previous track" >
            <FaStepBackward />
          </button>
          <button onClick={() => handleNextOrPrevious("next")} aria-label="Next track" >
            <FaStepForward />
          </button>
          
          <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"} >
            {isMuted ? <IoVolumeMute style={{width: "18px", height: "18px"}} /> : <IoVolumeHigh style={{width: "18px", height: "18px"}} />}
          </button>
          <button onClick={() => setIsHidden(prev => !prev)} style={{fontSize: "14px"}}>
            {isHidden
              ? <><FaVideo />Video Mode</>
              : <><FaMusic />Audio Mode</>
            }
          </button>
        </div>

        <div className="video-title-container">
          <div className="visualizer-container">
            <div className={`visualizer-bar ${isPlaying ? 'playing' : ''}`}></div>
            <div className={`visualizer-bar ${isPlaying ? 'playing' : ''}`}></div>
            <div className={`visualizer-bar ${isPlaying ? 'playing' : ''}`}></div>
          </div>
          <span>{videoTitle}</span>
        </div>
      </div>
    </>
  )
}
