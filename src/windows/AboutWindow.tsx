import './AboutWindow.css'
import InteractivePortrait from '../components/InteractivePortrait'

export default function AboutWindow() {
  return (
    <div className="about-window">
      <div className="about-intro">
        <InteractivePortrait />
        <div className="about-header">
          <h1 className="about-name">Shreyesh Arangath</h1>
          <h2 className="about-title">Software Engineer</h2>
          <p className="about-location">San Francisco, CA</p>
        </div>
      </div>

      <div className="about-links">
        <a
          href="mailto:shreyesh.arangath@gmail.com"
          className="about-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
        <a
          href="https://github.com/shreyesharangath"
          className="about-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/shreyesh"
          className="about-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>

      <div className="about-section">
        <h3>About</h3>
        <p>
          Software engineer with deep expertise in distributed systems and data infrastructure,
          specializing in the big data processing systems. Passionate about building high-performance,
          efficient systems that scale.
        </p>
        <p>
          Currently focused on optimizing large-scale data processing workloads, driving
          significant performance improvements and cost efficiencies across production systems
          handling millions of jobs daily.
        </p>
        <p>
          Strong track record in execution frameworks, query optimization, and developer
          productivity tooling. Experience spans backend systems, infrastructure, and
          full-stack development.
        </p>
      </div>

      <div className="about-section about-outside-work">
        <h3>Outside Work</h3>
        <p>
          Training Brazilian Jiu-Jitsu, lifting heavy things, and staying disciplined with
          health and fitness. Believe in continuous improvement both on and off the mat.
        </p>
      </div>
    </div>
  )
}
