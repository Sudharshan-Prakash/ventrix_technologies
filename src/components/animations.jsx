// Plays once, when ~15% of the element is on screen
export const viewport = { once: true, amount: 0.15, margin: '0px 0px -40px 0px' }
export const inView = { initial: 'hidden', whileInView: 'visible', viewport }

// Parent: staggers its motion children
export const stagger = (gap = 0.12, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
})

// Headings, paragraphs, rows
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Cards: rise, scale up and settle with a slight spring
export const popUp = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 140, damping: 15 },
  },
}

export const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}