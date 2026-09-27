import { useRef } from 'react'

export default function InteractivePortrait() {
  const frameRef = useRef<HTMLDivElement>(null)

  const reset = () => {
    const frame = frameRef.current
    if (!frame) return
    frame.style.setProperty('--tilt-x', '0deg')
    frame.style.setProperty('--tilt-y', '0deg')
    frame.style.setProperty('--drift-x', '0px')
    frame.style.setProperty('--drift-y', '0px')
    frame.style.setProperty('--spot-x', '50%')
    frame.style.setProperty('--spot-y', '40%')
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return

    const frame = frameRef.current
    if (!frame) return

    const bounds = frame.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    const tiltX = (x - 0.5) * 10
    const tiltY = (0.5 - y) * 10

    frame.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`)
    frame.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`)
    frame.style.setProperty('--drift-x', `${((x - 0.5) * 12).toFixed(1)}px`)
    frame.style.setProperty('--drift-y', `${((y - 0.5) * 12).toFixed(1)}px`)
    frame.style.setProperty('--spot-x', `${(x * 100).toFixed(1)}%`)
    frame.style.setProperty('--spot-y', `${(y * 100).toFixed(1)}%`)
  }

  return (
    <div
      ref={frameRef}
      className="about-portrait-frame"
      role="img"
      aria-label="Portrait of Shreyesh Arangath. Move the pointer across the portrait to explore the effect."
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      <div className="about-portrait-halo" aria-hidden="true" />
      <img
        className="about-portrait-image"
        src="/portrait-shreyesh.jpg"
        alt=""
        draggable={false}
      />
      <div className="about-portrait-sheen" aria-hidden="true" />
    </div>
  )
}
