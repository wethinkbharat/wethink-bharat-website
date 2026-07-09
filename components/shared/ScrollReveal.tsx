'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li'
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: Props) {
  const divRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const liRef = useRef<HTMLLIElement>(null)

  // Pick the right ref for useInView — only one will be active at a time.
  const activeRef =
    as === 'section' ? sectionRef : as === 'li' ? liRef : divRef

  const isInView = useInView(activeRef, { once: true, margin: '-80px' })

  const animateProps = {
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
    className,
  }

  if (as === 'section') {
    return (
      <motion.section ref={sectionRef} {...animateProps}>
        {children}
      </motion.section>
    )
  }

  if (as === 'li') {
    return (
      <motion.li ref={liRef} {...animateProps}>
        {children}
      </motion.li>
    )
  }

  return (
    <motion.div ref={divRef} {...animateProps}>
      {children}
    </motion.div>
  )
}
