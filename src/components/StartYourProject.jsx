import React, { useState } from 'react'
import { motion } from 'motion/react'
import { inView, stagger, fadeUp, slideLeft, slideRight } from './animations'

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

const nextSteps = [
  'We review your enquiry within 24 business hours.',
  'A free call to understand your goals and budget.',
  'You receive a clear scope and quote, with no obligation.',
]

const emptyForm = { name: '', email: '', company: '', service: '' }

const validate = (v) => {
  const e = {}
  if (!v.name.trim()) e.name = 'Your name is required.'
  if (!v.email.trim()) e.email = 'Email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter a valid email address.'
  if (!v.company.trim()) e.company = 'Company name is required.'
  if (!v.service) e.service = 'Please choose a service.'
  return e
}

const inputClass = (hasError) =>
  `mt-2 w-full rounded-lg border bg-white dark:bg-slate-900 px-4 py-3 text-slate-700 dark:text-white placeholder:text-slate-400 outline-none transition focus:ring-2 ${
    hasError
      ? 'border-red-400 focus:ring-red-200 dark:focus:ring-red-900'
      : 'border-slate-200 dark:border-slate-700 focus:border-[#4B8DB8] focus:ring-[#4B8DB8]/30'
  }`

const StartYourProject = () => {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

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
      // const res = await fetch('/api/enquiries', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // })
      // if (!res.ok) throw new Error('Request failed')
      await new Promise((r) => setTimeout(r, 800)) // demo delay, remove with real API
      setStatus('success')
      setValues(emptyForm)
    } catch {
      setStatus('error')
    }
  }

  const fields = [
    { name: 'name', label: 'Your name', type: 'text', placeholder: 'Full name', autoComplete: 'name' },
    { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@company.com', autoComplete: 'email' },
    { name: 'company', label: 'Company name', type: 'text', placeholder: 'Your company', autoComplete: 'organization' },
  ]

  return (
    <section
      id="start-project"
      className="dark:bg-[#06090F] py-20 px-4 sm:px-12 lg:px-24 xl:px-40"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
        {/* Left: header + what happens next */}
        <motion.div {...inView} variants={stagger(0.12)}>
          <motion.h2 variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Start your project
          </motion.h2>
          <motion.h1 variants={fadeUp} className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-slate-700 dark:text-white">
            Tell us what you're{' '}
            <span className="bg-gradient-to-r from-[#4B8DB8] to-[#7FA8F5] bg-clip-text text-transparent">
              building.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-md text-lg text-slate-500 dark:text-slate-400">
            Share a few details and we'll come back with a clear plan.
          </motion.p>

          <motion.ol variants={stagger(0.15)} className="mt-10 space-y-6">
            {nextSteps.map((s, i) => (
              <motion.li key={s} variants={slideLeft} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#4B8DB8]/50 text-sm font-semibold text-[#4B8DB8]">
                  {i + 1}
                </span>
                <p className="pt-1 text-slate-600 dark:text-slate-300">{s}</p>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>

        {/* Right: form card */}
        <motion.div
          {...inView}
          variants={slideRight}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 sm:p-8 shadow-sm"
        >
          {status === 'success' ? (
            <div className="py-10 text-center" role="status">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#4B8DB8]/10 text-[#4B8DB8]">
                <svg className="h-7 w-7" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
              </div>
              <h3 className="mt-6 text-2xl font-medium tracking-tight text-slate-700 dark:text-white">Message sent</h3>
              <p className="mt-3 text-slate-500 dark:text-slate-400">
                Thanks for reaching out. We'll reply within 24 business hours.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-8 text-sm font-semibold text-[#4B8DB8] hover:underline"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {fields.map((f) => (
                <div key={f.name}>
                  <label htmlFor={f.name} className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {f.label} <span className="text-red-500">*</span>
                  </label>
                  <input
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
                <label htmlFor="service" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Service interested in <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={values.service}
                  onChange={handleChange}
                  aria-invalid={!!errors.service}
                  className={inputClass(errors.service)}
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="mt-1.5 text-sm text-red-500">{errors.service}</p>}
              </div>

              {status === 'error' && (
                <p role="alert" className="rounded-lg bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#4B8DB8] px-8 py-3.5 font-medium text-white shadow-md transition-[background-color,box-shadow] hover:bg-[#3d7aa3] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
                {status !== 'sending' && (
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 10h12M11 5l5 5-5 5" />
                  </svg>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default StartYourProject