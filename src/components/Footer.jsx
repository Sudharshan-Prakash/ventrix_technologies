import React from 'react'
import { motion } from 'motion/react'
import { inView, stagger, fadeUp } from './animations'

const WHATSAPP_URL =
  'https://wa.me/917396149431?text=Hi%20Ventrix%20Technologies%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services.'

const company = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'AI Solutions',
  'Cloud Engineering',
  'SaaS Platforms',
  'Enterprise Software',
  'Automation Systems',
]

// TODO: replace "#" with your real profile URLs
const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ventrix-technologies/home/',
    icon: <path d="M4 9h4v11H4zM6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v1.6c.7-1.1 2-1.9 3.7-1.9 3 0 4.3 1.9 4.3 5.2V20h-4v-5.2c0-1.4-.5-2.3-1.7-2.3-1.3 0-2.3.9-2.3 2.5V20h-4z" />,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" />
      </>
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: <path d="M4 4l16 16M20 4L4 20" />,
  },
]

const linkClass = 'text-slate-500 dark:text-slate-400 transition-colors hover:text-[#4B8DB8]'
const colTitle = 'text-sm font-semibold uppercase tracking-widest text-slate-700 dark:text-white'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#06090F]">
      <div className="px-4 sm:px-12 lg:px-24 xl:px-40">
        {/* Closing CTA */}
        <motion.div
          {...inView}
          variants={stagger(0.15)}
          className="flex flex-col items-start justify-between gap-8 border-b border-slate-200 dark:border-slate-800 py-16 md:flex-row md:items-center"
        >
          <motion.h2
            variants={fadeUp}
            className="max-w-2xl text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] text-slate-700 dark:text-white"
          >
            Have a project in{' '}
            <span className="bg-gradient-to-r from-[#4B8DB8] to-[#7FA8F5] bg-clip-text text-transparent">mind?</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <a
              href="#start-project"
              className="inline-flex items-center gap-2 rounded-full bg-[#4B8DB8] px-7 py-3.5 font-medium text-white shadow-md transition-[background-color,box-shadow] hover:bg-[#3d7aa3] hover:shadow-lg"
            >
              Start Your Project
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-700 px-7 py-3.5 font-medium text-slate-700 dark:text-white transition hover:border-[#4B8DB8] hover:text-[#4B8DB8]"
            >
              WhatsApp us
            </a>
          </motion.div>
        </motion.div>

        {/* Link columns */}
        <motion.div
          {...inView}
          variants={stagger(0.12)}
          className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]"
        >
          {/* Brand */}
          <motion.div variants={fadeUp}>
            <a href="#" className="inline-flex items-center gap-2" aria-label="Ventrix Technologies home">
              <svg className="h-8 w-8 text-[#4B8DB8]" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path d="M3 5h7l6 15 6-15h7L18 27h-4z" />
              </svg>
              <span className="text-xl font-semibold tracking-tight text-slate-700 dark:text-white">Ventrix</span>
            </a>
            <p className="mt-4 max-w-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Web, mobile and AI software for businesses that want to scale at the speed of innovation.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 transition hover:border-[#4B8DB8] hover:bg-[#4B8DB8] hover:text-white"
                >
                  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Company */}
          <motion.nav variants={fadeUp} aria-label="Company">
            <h3 className={colTitle}>Company</h3>
            <ul className="mt-5 space-y-3">
              {company.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={linkClass}>{l.label}</a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Services */}
          <motion.nav variants={fadeUp} aria-label="Services">
            <h3 className={colTitle}>Services</h3>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className={linkClass}>{s}</a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h3 className={colTitle}>Get in touch</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a href="mailto:ventrixtechnologies@gmail.com" className={`${linkClass} break-all`}>
                  ventrixtechnologies@gmail.com
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  +91 73961 49431
                </a>
              </li>
              <li className="text-slate-500 dark:text-slate-400">Hyderabad, Telangana, India</li>
              <li className="text-slate-500 dark:text-slate-400">Replies within 24 business hours</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-200 dark:border-slate-800 py-8 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Ventrix Technologies. All rights reserved.</p>
          <a href="#" className="inline-flex items-center gap-2 font-medium transition-colors hover:text-[#4B8DB8]">
            Back to top
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 16V4M5 9l5-5 5 5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer