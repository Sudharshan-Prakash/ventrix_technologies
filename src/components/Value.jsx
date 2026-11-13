import React from 'react'
import { motion } from 'motion/react'
import { inView, stagger, fadeUp } from './animations'

const values = [
  { title: 'Trust at first glance', text: 'A fast, modern site turns visitors into enquiries. A slow one sends them to a competitor.' },
  { title: 'Reach on every device', text: 'Responsive sites and mobile apps meet customers where they already are.' },
  { title: 'Hours back each week', text: 'AI assistants and custom software take over repetitive work so your team can focus on growth.' },
  { title: 'Found in search', text: 'SEO and digital marketing are built in from day one, not bolted on later.' },
  { title: 'Room to scale', text: 'Clean architecture means new features take days, not rewrites.' },
  { title: 'Advice you can act on', text: 'IT consulting that helps you pick the right stack and avoid costly mistakes.' },
]

const Value = () => {
  return (
    <section id="value" className="dark:bg-[#06090F] py-20 px-4 sm:px-12 lg:px-24 xl:px-40">
      <motion.div {...inView} variants={stagger(0.12)}>
        <motion.h2 variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          What You're Leaving On The Table
        </motion.h2>
        <motion.h1 variants={fadeUp} className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-slate-700 dark:text-white">
          Every month on an outdated site or manual process costs you customers.
        </motion.h1>
      </motion.div>

      {/* Each row animates when it scrolls in */}
      <ul className="mt-16 border-t border-slate-200 dark:border-slate-800">
        {values.map((item, i) => (
          <motion.li
            key={item.title}
            {...inView}
            variants={fadeUp}
            className="group grid grid-cols-[2.5rem_1fr] md:grid-cols-[4rem_1fr_1.4fr] gap-x-4 md:gap-x-10 gap-y-2 items-baseline border-b border-slate-200 dark:border-slate-800 py-7 px-2 transition-colors duration-300 hover:bg-[#4B8DB8]/5"
          >
            <span className="text-sm font-medium text-slate-400 dark:text-slate-500 transition-colors duration-300 group-hover:text-[#4B8DB8]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-slate-700 dark:text-white transition-transform duration-300 group-hover:translate-x-1">
              {item.title}
            </h3>
            <p className="col-start-2 md:col-start-auto text-slate-500 dark:text-slate-400 leading-relaxed">{item.text}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default Value