import React from 'react'
import { motion } from 'motion/react'
import { inView, stagger, fadeUp, popUp } from './animations'

const steps = [
  { title: 'Talk', text: 'A free call on goals, users and budget. You leave with a scope and a quote.' },
  { title: 'Design', text: 'Wireframes and a visual direction you approve before any code is written.' },
  { title: 'Build', text: 'Short sprints with regular demos. You see real progress and steer early.' },
  { title: 'Launch & grow', text: 'Testing, deployment, then ongoing support, SEO and new features.' },
]

const dot = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 12, delay: 0.25 } },
}

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="dark:bg-[#06090F] py-20 px-4 sm:px-12 lg:px-24 xl:px-40"
    >
      <motion.div {...inView} variants={stagger(0.12)}>
        <motion.h2 variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          How It Works
        </motion.h2>
        <motion.h1 variants={fadeUp} className="mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-slate-700 dark:text-white">
          Four steps from first call to{' '}
          <span className="bg-gradient-to-r from-[#4B8DB8] to-[#7FA8F5] bg-clip-text text-transparent">
            live product.
          </span>
        </motion.h1>
      </motion.div>

      {/* Steps */}
      <motion.ol {...inView} variants={stagger(0.18)} className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            variants={popUp}
            className="group relative pt-6 border-t-2 border-slate-200 dark:border-slate-800 transition-[border-color] duration-300 hover:border-[#4B8DB8]"
          >
            <motion.span
              variants={dot}
              className="absolute -top-[7px] left-0 h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700 ring-4 ring-white dark:ring-[#06090F] transition-colors duration-300 group-hover:bg-[#4B8DB8]"
            />
            <span className="text-sm font-medium text-slate-400 dark:text-slate-500 transition-colors duration-300 group-hover:text-[#4B8DB8]">
              Step {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-2xl font-medium tracking-tight text-slate-700 dark:text-white">{step.title}</h3>
            <p className="mt-3 text-slate-500 dark:text-slate-400 leading-relaxed">{step.text}</p>
          </motion.li>
        ))}
      </motion.ol>

      {/* CTA */}
      <motion.a
        {...inView}
        variants={popUp}
        href="#start-project"
        className="mt-16 inline-flex items-center gap-2 rounded-full bg-[#4B8DB8] px-8 py-3.5 text-white font-medium shadow-md transition-[background-color,box-shadow] hover:bg-[#3d7aa3] hover:shadow-lg"
      >
        Start with Step 01
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 10h12M11 5l5 5-5 5" />
        </svg>
      </motion.a>
    </section>
  )
}

export default HowItWorks