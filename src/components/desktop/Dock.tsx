import './Dock.css'

type Section = 'about' | 'experience' | 'projects' | 'blog' | 'contact'

interface DockProps {
  onIconClick: (section: Section) => void
}

interface DockIconData {
  id: Section
  label: string
}

const dockIcons: DockIconData[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

export default function Dock({ onIconClick }: DockProps) {
  return (
    <div className="dock">
      <div className="dock-inner">
        {dockIcons.map((icon) => (
          <button
            key={icon.id}
            className="dock-icon"
            onClick={() => onIconClick(icon.id)}
            aria-label={icon.label}
            title={icon.label}
          >
            <span className={`dock-icon-pixel dock-icon-pixel-${icon.id}`} aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  )
}
