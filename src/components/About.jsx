import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { inView, stagger, fadeUp, popUp } from './animations'

const stats = [
  { value: 150, suffix: '+', label: 'Projects shipped' },
  { value: 40, suffix: '+', label: 'Tech experts' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
  { value: 12, suffix: '+', label: 'Industries served' },
]

const pillars = [
  {
    title: 'Our Vision',
    text: 'To be the most trusted technology partner for businesses building the next generation of digital products.',
    icon: (
      <>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: 'Our Mission',
    text: 'To deliver reliable, scalable software that solves real business problems, with clear communication at every step.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
  },
]

const values = [
  { title: 'Craft', text: 'Clean code and considered design in everything we ship.' },
  { title: 'Transparency', text: 'Honest scope, timelines and trade-offs, from day one.' },
  { title: 'Ownership', text: 'We stay accountable for results, long after launch.' },
  { title: 'Innovation', text: 'We adopt new tools like AI when they genuinely help.' },
]

// Counts up once when scrolled into view
const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setCount(value)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const duration = 1200
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          setCount(Math.round(value * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const About = () => {
  return (
    <section
      id="about"
      className="dark:bg-[#06090F] py-20 px-4 sm:px-12 lg:px-24 xl:px-40"
    >
      {/* Header */}
      <motion.div {...inView} variants={stagger(0.12)}>
        <motion.h2 variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          About Us
        </motion.h2>
        <motion.h1 variants={fadeUp} className="mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-slate-700 dark:text-white">
          Next-generation software,{' '}
          <span className="bg-gradient-to-r from-[#4B8DB8] to-[#7FA8F5] bg-clip-text text-transparent">
            built in Hyderabad.
          </span>
        </motion.h1>
      </motion.div>

      {/* Overview + stats */}
      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
        <motion.div {...inView} variants={stagger(0.15)} className="space-y-5 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
          <motion.p variants={fadeUp}>
            <span className="font-medium text-slate-700 dark:text-white">Ventrix Technologies</span> is a
            next-generation software company headquartered in Hyderabad, India. We build transformative
            digital products and enterprise solutions that empower businesses to scale at the speed of
            innovation.
          </motion.p>
          <motion.p variants={fadeUp}>
            From AI-powered platforms to cloud-native SaaS systems, our engineering teams combine startup
            agility with enterprise rigor to deliver solutions that matter.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="#contact"
            className="inline-flex items-center gap-2 pt-2 text-base font-semibold text-[#4B8DB8] transition-all hover:gap-3"
          >
            Work with us
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 10h12M11 5l5 5-5 5" />
            </svg>
          </motion.a>
        </motion.div>

        <motion.dl
          {...inView}
          variants={stagger(0.12)}
          className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={popUp}
              className={`p-8 bg-white dark:bg-slate-900/40 ${i % 2 === 0 ? 'border-r' : ''} ${
                i < 2 ? 'border-b' : ''
              } border-slate-200 dark:border-slate-800`}
            >
              <dd className="text-4xl sm:text-5xl font-medium tracking-tight text-slate-700 dark:text-white">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 text-sm text-slate-500 dark:text-slate-400">{s.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>

      {/* Vision & Mission */}
      <motion.div {...inView} variants={stagger(0.15)} className="mt-20 grid gap-6 md:grid-cols-2">
        {pillars.map((p) => (
          <motion.div
            key={p.title}
            variants={popUp}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-8 shadow-sm transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#4B8DB8]/60 hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4B8DB8]/10 text-[#4B8DB8] transition-colors duration-300 group-hover:bg-[#4B8DB8] group-hover:text-white">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {p.icon}
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-medium tracking-tight text-slate-700 dark:text-white">{p.title}</h3>
            <p className="mt-3 leading-relaxed text-slate-500 dark:text-slate-400">{p.text}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Values */}
      <div className="mt-20">
        <motion.h3
          {...inView}
          variants={fadeUp}
          className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400"
        >
          Our Values
        </motion.h3>
        <motion.ul {...inView} variants={stagger(0.12)} className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.li
              key={v.title}
              variants={fadeUp}
              className="group pt-6 border-t-2 border-slate-200 dark:border-slate-800 transition-colors duration-300 hover:border-[#4B8DB8]"
            >
              <span className="text-sm font-medium text-slate-400 dark:text-slate-500 transition-colors duration-300 group-hover:text-[#4B8DB8]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="mt-3 text-xl font-medium tracking-tight text-slate-700 dark:text-white">{v.title}</h4>
              <p className="mt-2 text-slate-500 dark:text-slate-400 leading-relaxed">{v.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Company presentation */}
      <motion.div
        {...inView}
        variants={popUp}
        className="mt-20 flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-8 sm:flex-row sm:items-center"
      >
        <div>
          <h3 className="text-2xl font-medium tracking-tight text-slate-700 dark:text-white">Company presentation</h3>
          <p className="mt-1 text-slate-500 dark:text-slate-400">A short overview of who we are, what we build and how we work.</p>
        </div>
        <a
          href="/Ventrix-Company-Presentation.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#4B8DB8] px-7 py-3 font-medium text-white shadow-md transition-[background-color,box-shadow] hover:bg-[#3d7aa3] hover:shadow-lg"
        >
          View presentation
        </a>
      </motion.div>
    </section>
  )
}

export default About