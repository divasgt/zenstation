export default function Header({theme, setTheme, setIsCustomTheme}) {
  return (
  <header>
    <nav>
      <ul>
        <li><a className="home-nav-link" onClick={() => setTheme("default")}>😎</a></li>
        <li><a onClick={() => setTheme("lofi")}>Lofi</a></li>
        <li><a onClick={() => setTheme("cafe")}>Cafe</a></li>
        <li><a onClick={() => setTheme("library")}>Library</a></li>
        <li><a onClick={() => setTheme("relax")}>Relax</a></li>
        <li><a onClick={() => setIsCustomTheme(prev => !prev)}>Create my vibe</a></li>
        {/* on clicking above, pause video if playing and show entering link popup */}
      </ul>
    </nav>
  </header>
  )
}