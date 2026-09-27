import { useState } from 'react'
import './ContactWindow.css'

export default function ContactWindow() {
  const [copied, setCopied] = useState(false)
  const email = 'shreyesh.arangath@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="contact-window">
      <div className="contact-intro">
        <h2>Get in Touch</h2>
        <p>
          Always happy to discuss distributed systems, data infrastructure, or interesting
          technical problems.
        </p>
      </div>

      <div className="contact-card">
        <div className="contact-item">
          <div className="contact-icon">@</div>
          <div className="contact-details">
            <h3>Email</h3>
            <a href={`mailto:${email}`} className="contact-link">
              {email}
            </a>
            <button className="contact-copy" onClick={copyEmail}>
              {copied ? '✓ Copied!' : 'Copy email'}
            </button>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-icon">GH</div>
          <div className="contact-details">
            <h3>GitHub</h3>
            <a
              href="https://github.com/shreyesharangath"
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/shreyesharangath
            </a>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-icon">in</div>
          <div className="contact-details">
            <h3>LinkedIn</h3>
            <a
              href="https://linkedin.com/in/shreyesh"
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/shreyesh
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
