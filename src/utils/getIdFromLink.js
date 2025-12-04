export default function getIdfromLink(ytLink = "") {
  if (typeof ytLink !== 'string') {
    return null
  }

  if (ytLink.includes("?v=")) {
    const videoId = ytLink.split("?v=")[1].substring(0, 11)
    if (videoId.length === 11) return videoId
    else return null
  } else if (ytLink.includes(".be/")) {
    const videoId = ytLink.split(".be/")[1].substring(0, 11)
    if (videoId.length === 11) return videoId
    else return null
  }
  
  return null
}