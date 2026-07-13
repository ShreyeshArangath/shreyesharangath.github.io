import TopBar from './TopBar'
import DesktopIcons from './DesktopIcons'
import Dock from './Dock'
import CommandPalette from './CommandPalette'
import AboutWindow from '../../windows/AboutWindow'
import ExperienceWindow from '../../windows/ExperienceWindow'
import ProjectsWindow from '../../windows/ProjectsWindow'
import BlogWindow from '../../windows/BlogWindow'
import ContactWindow from '../../windows/ContactWindow'
import ResearchWindow from '../../windows/ResearchWindow'
import './Desktop.css'

type Section = 'about' | 'experience' | 'research' | 'projects' | 'blog' | 'contact'

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
  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <AboutWindow />
      case 'experience':
        return <ExperienceWindow />
      case 'research':
        return <ResearchWindow />
      case 'projects':
        return <ProjectsWindow />
      case 'blog':
        return <BlogWindow />
      case 'contact':
        return <ContactWindow />
      default:
        return <AboutWindow />
    }
  }

  return (
    <div className="desktop">
      <TopBar />

      <div className="desktop-main">
        <DesktopIcons onIconClick={setActiveSection} />
        <main className="desktop-content" aria-live="polite">
          {renderContent()}
        </main>
      </div>

      <Dock onIconClick={setActiveSection} />

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
