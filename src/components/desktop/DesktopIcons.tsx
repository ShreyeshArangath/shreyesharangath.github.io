import './DesktopIcons.css'

type Section = 'about' | 'experience' | 'projects' | 'blog' | 'contact'

interface DesktopIconsProps {
  onIconClick: (section: Section) => void
}

interface IconData {
  id: Section
  label: string
}

const icons: IconData[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

export default function DesktopIcons({ onIconClick }: DesktopIconsProps) {
  return (
    <div className="desktop-icons">
      {icons.map((icon, index) => (
        <button
          key={index}
          className="desktop-icon"
          onClick={() => onIconClick(icon.id)}
          aria-label={icon.label}
        >
          <span className={`desktop-icon-image desktop-icon-pixel desktop-icon-pixel-${icon.id}`} aria-hidden="true" />
          <div className="desktop-icon-label">{icon.label}</div>
        </button>
      ))}
    </div>
  )
}
