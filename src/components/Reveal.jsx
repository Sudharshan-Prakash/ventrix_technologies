import React, { useEffect, useRef, useState } from 'react'

/**
 * Fades and slides an element up the first time it scrolls into view.
 * Props: as (tag), delay (ms), className, plus any normal HTML props.
 * The animation class is removed afterwards, so your hover effects still work.
 */
const Reveal = ({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) => {
  const ref = useRef(null)
  const [state, setState] = useState('hidden') // hidden | in | done

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      setState('done')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('in')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const stateClass = state === 'hidden' ? 'reveal-hidden' : state === 'in' ? 'reveal-in' : ''

  return (
    <Tag
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` }}
      onAnimationEnd={(e) => e.target === e.currentTarget && state === 'in' && setState('done')}
      className={`${className} ${stateClass}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal