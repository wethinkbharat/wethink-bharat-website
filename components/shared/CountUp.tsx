'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  /** Numeric string, e.g. "65" or "1.5" */
  value: string
  /** Unit/suffix appended after the number, e.g. "%" or "Cr+" */
  suffix: string
  className?: string
}

export function CountUp({ value, suffix, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  const numericValue = parseFloat(value)
  const isDecimal = value.includes('.')

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    const start = Date.now()

    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numericValue * eased

      setDisplay(
        isDecimal ? current.toFixed(1) : Math.round(current).toString()
      )

      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, numericValue, isDecimal])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
