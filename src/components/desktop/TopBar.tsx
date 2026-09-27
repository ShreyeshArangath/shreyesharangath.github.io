import { useState, useEffect } from 'react'
import './TopBar.css'

export default function TopBar() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const dayName = days[date.getDay()]
    const day = String(date.getDate()).padStart(2, '0')
    const month = months[date.getMonth()]
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${dayName} ${day} ${month} ${hours}:${minutes}`
  }

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="topbar-button">shreyesh@portfolio:~</button>
      </div>
      <div className="topbar-right">
        <span className="topbar-lang">en</span>
        <span className="topbar-time">{formatDate(currentTime)}</span>
      </div>
    </div>
  )
}
