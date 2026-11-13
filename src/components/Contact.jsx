import React from 'react'
import { motion } from 'motion/react'
import { inView, stagger, fadeUp, popUp } from './animations'

const WHATSAPP_URL =
  'https://wa.me/917396149431?text=Hi%20Ventrix%20Technologies%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services.'

const details = [
  {
    label: 'Email',
    value: 'ventrixtechnologies@gmail.com',
    href: 'mailto:ventrixtechnologies@gmail.com',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
  {
    label: 'WhatsApp',
    value: '+91 73961 49431 — Chat now',
    href: WHATSAPP_URL,
    external: true,
    icon: (
      <>
        <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5z" />
        <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.3-1.5-2-1-1 .7a4 4 0 0 1-1.7-1.7l.7-1-1-2z" />
      </>
    ),
  },
  {
    label: 'Location',
    value: 'Hyderabad, Telangana, India',
    icon: (
      <>
        <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    label: 'Response time',
    value: 'Within 24 business hours',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
]

// TODO: replace "#" with your real profile URLs
const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/ventrix-technologies/home/' },
  { name: 'Instagram', href: '#' },
  { name: 'X', href: '#' },
]

const cardClass =
  'group block rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-7 shadow-sm transition-[translate,box-shadow,border-color] duration-300'

const Contact = () => {
  return (
    <section
      id="contact"
      className="dark:bg-[#06090F] pt-20 pb-10 px-4 sm:px-12 lg:px-24 xl:px-40"
    >
      {/* Header */}
      <motion.div {...inView} variants={stagger(0.12)}>
        <motion.h2 variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Contact
        </motion.h2>
        <motion.h1 variants={fadeUp} className="mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-slate-700 dark:text-white">
          Let's talk about{' '}
          <span className="bg-gradient-to-r from-[#4B8DB8] to-[#7FA8F5] bg-clip-text text-transparent">
            your idea.
          </span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-slate-500 dark:text-slate-400">
          Reach us the way that suits you. We reply to every message.
        </motion.p>
      </motion.div>

      {/* Detail cards */}
      <motion.div {...inView} variants={stagger(0.12)} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {details.map((d) => {
          const body = (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4B8DB8]/10 text-[#4B8DB8] transition-colors duration-300 group-hover:bg-[#4B8DB8] group-hover:text-white">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {d.icon}
                </svg>
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">{d.label}</p>
              <p className="mt-2 break-words font-medium text-slate-700 dark:text-white">{d.value}</p>
            </>
          )

          return d.href ? (
            <motion.a
              key={d.label}
              variants={popUp}
              href={d.href}
              {...(d.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`${cardClass} hover:-translate-y-1 hover:border-[#4B8DB8]/60 hover:shadow-xl`}
            >
              {body}
            </motion.a>
          ) : (
            <motion.div key={d.label} variants={popUp} className={cardClass}>
              {body}
            </motion.div>
          )
        })}
      </motion.div>

      {/* Socials */}
      <motion.div {...inView} variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-500 dark:text-slate-400">Follow us</span>
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-200 dark:border-slate-700 px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 transition hover:border-[#4B8DB8] hover:text-[#4B8DB8]"
          >
            {s.name}
          </a>
        ))}
      </motion.div>
    </section>
  )
}

export default Contact