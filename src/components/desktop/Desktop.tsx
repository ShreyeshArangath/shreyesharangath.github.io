import { useState } from 'react'
import TopBar from './TopBar'
import DesktopIcons from './DesktopIcons'
import Dock from './Dock'
import CommandPalette from './CommandPalette'
import Window from './Window'
import './Desktop.css'

type Section = 'about' | 'experience' | 'projects' | 'blog' | 'contact'

interface DesktopProps {
  activeSection: Section
  setActiveSection: (section: Section) => void
  showCommandPalette: boolean
  setShowCommandPalette: (show: boolean) => void
  commandInput: string
  setCommandInput: (input: string) => void
  handleCommand: (cmd: string) => void
}

export default function Desktop({
  activeSection,
  setActiveSection,
  showCommandPalette,
  setShowCommandPalette,
  commandInput,
  setCommandInput,
  handleCommand,
}: DesktopProps) {
  const [windowOpen, setWindowOpen] = useState(true)

  return (
    <div className="desktop">
      <TopBar />

      <div className="desktop-main">
        <DesktopIcons onIconClick={setActiveSection} />
        {windowOpen && (
          <Window
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            onClose={() => setWindowOpen(false)}
          />
        )}
      </div>

      <Dock onIconClick={(section) => {
        setActiveSection(section)
        setWindowOpen(true)
      }} />

      {showCommandPalette && (
        <CommandPalette
          value={commandInput}
          onChange={setCommandInput}
          onSubmit={handleCommand}
          onClose={() => {
            setShowCommandPalette(false)
            setCommandInput('')
          }}
        />
      )}
    </div>
  )
}
