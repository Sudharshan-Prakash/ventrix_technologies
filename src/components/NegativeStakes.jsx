import React from 'react'
import { motion } from 'motion/react'
import { inView, stagger, fadeUp } from './animations'

const rows = [
  {
    promise: '“Live in a week.”',
    reality: 'A recycled template that breaks on your first custom request.',
    commit: 'Designed and built from scratch. Clean code you own.',
  },
  {
    promise: '“The lowest quote.”',
    reality: 'Add-ons and surprise invoices later.',
    commit: 'Fixed scope, written down before work starts.',
  },
  {
    promise: '“AI in everything.”',
    reality: 'Buzzwords, no measurable result.',
    commit: 'AI only where it saves time or wins customers.',
  },
  {
    promise: '“We’ll handle it all.”',
    reality: 'Then silence after handover.',
    commit: 'Same team stays for fixes and new features.',
  },
]

const NegativeStakes = () => {
  return (
    <section id="promises" className="dark:bg-[#06090F] py-20 px-4 sm:px-12 lg:px-24 xl:px-40">
      {/* Header */}
      <motion.div {...inView} variants={stagger(0.12)} className="text-center">
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-1.5 text-sm text-slate-600 dark:text-slate-300 shadow-md"
        >
          <span className="h-2 w-2 rounded-full bg-[#4B8DB8]" />
          Before you choose
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-slate-700 dark:text-white"
        >
          Most projects don't fail on code.
          <br className="hidden sm:block" />{' '}
          They{' '}
          <span className="bg-gradient-to-r from-[#4B8DB8] to-[#7FA8F5] bg-clip-text text-transparent">
            fail on promises.
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-slate-500 dark:text-slate-400">
          Before you sign with anyone, compare what you're being told with what usually happens.
        </motion.p>
      </motion.div>

      {/* Comparison */}
      <motion.div
        {...inView}
        variants={stagger(0.14)}
        className="mt-14 max-w-5xl mx-auto overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 text-left"
      >
        {/* Column headings */}
        <motion.div
          variants={fadeUp}
          className="hidden md:grid md:grid-cols-2 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800"
        >
          <div className="px-8 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            What others promise
          </div>
          <div className="px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#4B8DB8] md:border-l border-slate-200 dark:border-slate-800">
            What we commit to
          </div>
        </motion.div>

        {rows.map((row, i) => (
          <motion.div
            key={row.promise}
            variants={fadeUp}
            className={`grid grid-cols-1 md:grid-cols-2 ${
              i !== rows.length - 1 ? 'border-b border-slate-200 dark:border-slate-800' : ''
            }`}
          >
            {/* Others */}
            <div className="px-6 sm:px-8 py-6">
              <span className="md:hidden block mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                What others promise
              </span>
              <p className="font-semibold text-slate-500 dark:text-slate-400 line-through decoration-1">{row.promise}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{row.reality}</p>
            </div>

            {/* Ventrix */}
            <div className="px-6 sm:px-8 py-6 bg-[#4B8DB8]/5 md:bg-transparent md:border-l border-t md:border-t-0 border-slate-200 dark:border-slate-800">
              <span className="md:hidden block mb-2 text-xs font-semibold uppercase tracking-widest text-[#4B8DB8]">
                What we commit to
              </span>
              <p className="flex items-start gap-3 font-medium text-slate-900 dark:text-white">
                <svg className="mt-1 h-4 w-4 shrink-0 text-[#4B8DB8]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
                {row.commit}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default NegativeStakes