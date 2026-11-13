import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { inView, stagger, fadeUp, popUp } from './animations'

const roles = [
  {
    title: 'Full Stack Developer',
    location: 'Hyderabad / Remote',
    type: 'Full-time',
    description: 'Build React and Node.js applications end to end, from database design to polished interfaces.',
    skills: ['React', 'Node.js', 'MongoDB'],
    icon: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />,
  },
  {
    title: 'UI/UX Designer',
    location: 'Hyderabad / Remote',
    type: 'Full-time',
    description: 'Turn product ideas into clear, accessible interfaces, from wireframes to production-ready design systems.',
    skills: ['Figma', 'Prototyping', 'Design Systems'],
    icon: (
      <>
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" />
        <path d="M2 2l7.6 7.6" />
        <circle cx="11" cy="11" r="2" />
      </>
    ),
  },
  {
    title: 'Flutter Developer',
    location: 'Hyderabad / Remote',
    type: 'Full-time',
    description: 'Ship fast, native-feeling iOS and Android apps from a single Flutter codebase.',
    skills: ['Flutter', 'Dart', 'REST APIs'],
    icon: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    title: 'AI Engineer',
    location: 'Hyderabad / Remote',
    type: 'Full-time',
    description: 'Design and deploy LLM-powered features, automation and intelligent workflows for real clients.',
    skills: ['Python', 'LLMs', 'APIs'],
    icon: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
      </>
    ),
  },
]

const emptyForm = { fullName: '', email: '', portfolio: '', coverNote: '' }

const validate = (v) => {
  const e = {}
  if (!v.fullName.trim()) e.fullName = 'Full name is required.'
  if (!v.email.trim()) e.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter a valid email address.'
  if (!v.portfolio.trim()) e.portfolio = 'Portfolio or LinkedIn link is required.'
  else if (!/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i.test(v.portfolio.trim()))
    e.portfolio = 'Enter a valid link, e.g. linkedin.com/in/yourname.'
  if (!v.coverNote.trim()) e.coverNote = 'Cover note is required.'
  else if (v.coverNote.trim().length < 30) e.coverNote = 'Please write at least 30 characters.'
  return e
}

const inputClass = (hasError) =>
  `mt-2 w-full rounded-lg border bg-white dark:bg-slate-900 px-4 py-3 text-slate-700 dark:text-white placeholder:text-slate-400 outline-none transition focus:ring-2 ${
    hasError
      ? 'border-red-400 focus:ring-red-200 dark:focus:ring-red-900'
      : 'border-slate-200 dark:border-slate-700 focus:border-[#4B8DB8] focus:ring-[#4B8DB8]/30'
  }`

const ApplyModal = ({ role, onClose }) => {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const firstField = useRef(null)

  // Close on Esc, lock page scroll, focus first field
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstField.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return

    setStatus('sending')
    try {
      // TODO: replace with your Express endpoint
      // const res = await fetch('/api/applications', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ role: role.title, ...values }),
      // })
      // if (!res.ok) throw new Error('Request failed')
      await new Promise((r) => setTimeout(r, 800)) // demo delay, remove with real API
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const fields = [
    { name: 'fullName', label: 'Full name', type: 'text', placeholder: 'Your full name', autoComplete: 'name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
    { name: 'portfolio', label: 'Portfolio / LinkedIn', type: 'text', placeholder: 'linkedin.com/in/yourname', autoComplete: 'url' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0B111C] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#4B8DB8]/10 text-[#4B8DB8]">
              <svg className="h-7 w-7" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10.5l4 4 8-9" />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-medium tracking-tight text-slate-700 dark:text-white">Application sent</h3>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Thanks for applying for {role.title}. We'll review it and get back to you by email.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full bg-[#4B8DB8] px-8 py-3 font-medium text-white shadow-md transition hover:bg-[#3d7aa3]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#4B8DB8]">Apply now</p>
            <h3 id="apply-title" className="mt-2 text-2xl font-medium tracking-tight text-slate-700 dark:text-white">
              {role.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{role.location}</p>

            <div className="mt-6 space-y-5">
              {fields.map((f, i) => (
                <div key={f.name}>
                  <label htmlFor={f.name} className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {f.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={i === 0 ? firstField : null}
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    placeholder={f.placeholder}
                    value={values[f.name]}
                    onChange={handleChange}
                    aria-invalid={!!errors[f.name]}
                    className={inputClass(errors[f.name])}
                  />
                  {errors[f.name] && <p className="mt-1.5 text-sm text-red-500">{errors[f.name]}</p>}
                </div>
              ))}

              <div>
                <label htmlFor="coverNote" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Cover note <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="coverNote"
                  name="coverNote"
                  rows={4}
                  placeholder="Tell us briefly why you're a great fit."
                  value={values.coverNote}
                  onChange={handleChange}
                  aria-invalid={!!errors.coverNote}
                  className={`${inputClass(errors.coverNote)} resize-none`}
                />
                {errors.coverNote && <p className="mt-1.5 text-sm text-red-500">{errors.coverNote}</p>}
              </div>
            </div>

            {status === 'error' && (
              <p className="mt-5 rounded-lg bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-7 w-full rounded-full bg-[#4B8DB8] px-8 py-3.5 font-medium text-white shadow-md transition hover:bg-[#3d7aa3] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Submitting…' : 'Submit application'}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

const Careers = () => {
  const [activeRole, setActiveRole] = useState(null)

  return (
    <section
      id="careers"
      className="dark:bg-[#06090F] py-20 px-4 sm:px-12 lg:px-24 xl:px-40"
    >
      {/* Header */}
      <motion.div {...inView} variants={stagger(0.12)}>
        <motion.h2 variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Careers
        </motion.h2>
        <motion.h1 variants={fadeUp} className="mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-slate-700 dark:text-white">
          Join our{' '}
          <span className="bg-gradient-to-r from-[#4B8DB8] to-[#7FA8F5] bg-clip-text text-transparent">
            team.
          </span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-slate-500 dark:text-slate-400">
          Work on real products with people who care about craft. Hybrid in Hyderabad or fully remote.
        </motion.p>
      </motion.div>

      {/* Roles */}
      <motion.div {...inView} variants={stagger(0.15)} className="mt-16 grid gap-6 md:grid-cols-2">
        {roles.map((role) => (
          <motion.article
            key={role.title}
            variants={popUp}
            className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-7 shadow-sm transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#4B8DB8]/60 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4B8DB8]/10 text-[#4B8DB8] transition-colors duration-300 group-hover:bg-[#4B8DB8] group-hover:text-white">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {role.icon}
                </svg>
              </div>
              <span className="rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {role.type}
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-medium tracking-tight text-slate-700 dark:text-white">{role.title}</h3>

            <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <svg className="h-4 w-4 text-[#4B8DB8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {role.location}
            </p>

            <p className="mt-4 leading-relaxed text-slate-500 dark:text-slate-400">{role.description}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {role.skills.map((s) => (
                <li key={s} className="rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setActiveRole(role)}
                className="inline-flex items-center gap-2 rounded-full bg-[#4B8DB8] px-7 py-3 font-medium text-white shadow-md transition-[background-color,box-shadow] hover:bg-[#3d7aa3] hover:shadow-lg"
              >
                Apply Now
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10h12M11 5l5 5-5 5" />
                </svg>
              </button>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {activeRole && <ApplyModal role={activeRole} onClose={() => setActiveRole(null)} />}
    </section>
  )
}

export default Careers