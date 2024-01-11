import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes'
import {BsMoonStars} from 'react-icons/bs';
import {ImSun} from 'react-icons/im';

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme("dark")

  const toggletheme = (e) => {
    const inactiveTheme = e === "light" ? "dark" : "light";
    setTheme(inactiveTheme)
  }
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <> 
      
          <div className="pointer bck" onClick={(e) => toggletheme(theme)}>
          {
            theme === "light" ? <div className="modecss"><span> Dark Mode </span> <BsMoonStars className="modecld"/> </div> : <div className="modecss"><span> Light Mode  </span><ImSun className="modecld"/> </div> 
          }
          </div>
    </>
  )
}
export default ThemeChanger;