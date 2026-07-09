'use client'
import { useEffect, useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      aria-label="Back to top"
      className={`back-to-top${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
