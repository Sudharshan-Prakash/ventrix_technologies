import React from 'react'
import { motion } from 'motion/react'
import { inView, stagger, fadeUp, popUp } from './animations'

const icons = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  design: (
    <>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" />
      <path d="M2 2l7.6 7.6" />
      <circle cx="11" cy="11" r="2" />
    </>
  ),
  ai: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
  saas: (
    <>
      <path d="M12 2l10 5-10 5L2 7z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </>
  ),
  enterprise: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 21v-4h6v4" />
    </>
  ),
  automation: (
    <>
      <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
      <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
      <path d="M21 3v5h-5M3 21v-5h5" />
    </>
  ),
}

const services = [
  { title: 'Web Development', description: 'High-performance web applications built with modern frameworks, optimized for speed, scalability, and conversion.', icon: 'web' },
  { title: 'Mobile Apps', description: 'Cross-platform mobile solutions with native performance using Flutter and React Native for iOS and Android.', icon: 'mobile' },
  { title: 'UI/UX Design', description: 'Cinematic product design that converts. Human-centered interfaces with premium visual craftsmanship.', icon: 'design' },
  { title: 'AI Solutions', description: 'Custom AI integrations, LLM-powered applications, and intelligent automation for enterprise workflows.', icon: 'ai' },
  { title: 'Cloud Engineering', description: 'Scalable cloud infrastructure architecture, DevOps pipelines, and multi-cloud deployments built for reliability.', icon: 'cloud' },
  { title: 'SaaS Platforms', description: 'End-to-end SaaS product development from ideation to launch — billing, multi-tenancy, and analytics included.', icon: 'saas' },
  { title: 'Enterprise Software', description: 'Custom ERP, CRM, and business intelligence platforms tailored to complex organizational workflows.', icon: 'enterprise' },
  { title: 'Automation Systems', description: 'RPA, workflow automation, and intelligent process optimization that frees your team for high-value work.', icon: 'automation' },
]

const Service = () => {
  return (
    <section
      id="services"
      className="dark:bg-[#06090F] py-20 px-4 sm:px-12 lg:px-24 xl:px-40"
    >
      {/* Header */}
      <motion.div {...inView} variants={stagger(0.12)}>
        <motion.h2 variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Our Services
        </motion.h2>
        <motion.h1 variants={fadeUp} className="mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-slate-700 dark:text-white">
          Everything you need to{' '}
          <span className="bg-gradient-to-r from-[#4B8DB8] to-[#7FA8F5] bg-clip-text text-transparent">
            build and scale.
          </span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-slate-500 dark:text-slate-400">
          From first prototype to production, one team covers design, engineering and growth.
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div {...inView} variants={stagger(0.1)} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={popUp}
            className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-7 shadow-sm transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#4B8DB8]/60 hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4B8DB8]/10 text-[#4B8DB8] transition-colors duration-300 group-hover:bg-[#4B8DB8] group-hover:text-white">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {icons[service.icon]}
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-medium tracking-tight text-slate-700 dark:text-white">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Service