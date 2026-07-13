import { useState, useEffect, useCallback } from 'react'
import Desktop from './components/desktop/Desktop'
import './styles/App.css'

type Section = 'about' | 'experience' | 'research' | 'projects' | 'blog' | 'contact'

function App() {
  const [activeSection, setActiveSection] = useState<Section>('about')
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [commandInput, setCommandInput] = useState('')

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()

    if (trimmed === ':help') {
      alert(`Available commands:
:about - About section
:experience - Experience section
:projects - Projects section
:essays - Essays
:contact - Contact information
:research - Research publications

Navigation shortcuts:
j/k - Navigate items
h/l - Switch tabs
: - Open command palette
Esc - Close command palette`)
      return
    }

    const sectionMap: Record<string, Section> = {
      ':about': 'about',
      ':experience': 'experience',
      ':research': 'research',
      ':projects': 'projects',
      ':blog': 'blog',
      ':essays': 'blog',
      ':contact': 'contact',
    }

    const section = sectionMap[trimmed]
    if (section) {
      setActiveSection(section)
      setShowCommandPalette(false)
      setCommandInput('')
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Open command palette with ':'
      if (e.key === ':' && !showCommandPalette) {
        e.preventDefault()
        setShowCommandPalette(true)
        return
      }

      // Close command palette with Escape
      if (e.key === 'Escape' && showCommandPalette) {
        setShowCommandPalette(false)
        setCommandInput('')
        return
      }

      // Tab navigation with h/l
      if (!showCommandPalette) {
        const sections: Section[] = ['about', 'experience', 'research', 'projects', 'blog', 'contact']
        const currentIndex = sections.indexOf(activeSection)

        if (e.key === 'h' && currentIndex > 0) {
          e.preventDefault()
          setActiveSection(sections[currentIndex - 1])
        } else if (e.key === 'l' && currentIndex < sections.length - 1) {
          e.preventDefault()
          setActiveSection(sections[currentIndex + 1])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection, showCommandPalette])

  return (
    <Desktop
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      showCommandPalette={showCommandPalette}
      setShowCommandPalette={setShowCommandPalette}
      commandInput={commandInput}
      setCommandInput={setCommandInput}
      handleCommand={handleCommand}
    />
  )
}

export default App
