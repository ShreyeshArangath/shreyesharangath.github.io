import { useState } from 'react'
import AboutWindow from '../../windows/AboutWindow'
import ExperienceWindow from '../../windows/ExperienceWindow'
import ProjectsWindow from '../../windows/ProjectsWindow'
import BlogWindow from '../../windows/BlogWindow'
import ContactWindow from '../../windows/ContactWindow'
import ResearchWindow from '../../windows/ResearchWindow'
import './Window.css'

type Section = 'about' | 'experience' | 'projects' | 'blog' | 'contact' | 'research'

interface WindowProps {
  activeSection: Section
  setActiveSection: (section: Section) => void
  onClose: () => void
}

const tabs: { id: Section; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Essays' },
  { id: 'contact', label: 'Contact' },
]

export default function Window({ activeSection, setActiveSection, onClose }: WindowProps) {
  const [isMinimized, setIsMinimized] = useState(false)

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

  if (isMinimized) {
    return null
  }

  return (
    <div className="window">
      <div className="window-titlebar">
        <div className="window-title">
          {tabs.find((t) => t.id === activeSection)?.label || 'About'}
        </div>
        <div className="window-controls">
          <button
            className="window-control window-minimize"
            onClick={() => setIsMinimized(true)}
            aria-label="Minimize"
            title="Minimize"
          >
            −
          </button>
          <button
            className="window-control window-maximize"
            aria-label="Maximize"
            title="Maximize (decorative)"
          >
            □
          </button>
          <button
            className="window-control window-close"
            onClick={onClose}
            aria-label="Close"
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      <div className="window-content">
        <div className="window-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`window-tab ${activeSection === tab.id ? 'active' : ''}`}
              onClick={() => setActiveSection(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="window-body">{renderContent()}</div>

        <div className="window-statusbar">
          <span className="window-mode">NORMAL</span>
          <span className="window-section">{activeSection.toUpperCase()}</span>
        </div>
      </div>
    </div>
  )
}
