import React from 'react'
import { motion } from 'motion/react'
import { inView, stagger, fadeUp, popUp } from './animations'

const icons = {
  hub: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M14 17.5h7M17.5 14v7" />
    </>
  ),
  ai: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  enterprise: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 21v-4h6v4" />
    </>
  ),
  cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
}

const products = [
  {
    tag: '★ Flagship',
    featured: true,
    icon: 'hub',
    name: 'MyServiceHub',
    description: 'An all-in-one business operations platform that unifies service management, client communication, and analytics in a single intelligent workspace.',
    features: ['Real-time service tracking dashboard', 'AI-powered client communication', 'Advanced analytics & reporting', 'Multi-team collaboration tools'],
    benefit: 'One workspace instead of five disconnected tools.',
    link: '#contact',
  },
  {
    tag: 'AI-Powered',
    icon: 'ai',
    name: 'VentrixAI Platform',
    description: 'Enterprise AI infrastructure for deploying, monitoring, and scaling custom AI models with production-grade reliability.',
    features: ['Custom LLM fine-tuning pipeline', 'Model monitoring & observability', 'API-first integration layer', 'Enterprise security compliance'],
    benefit: 'Move AI from prototype to production with confidence.',
    link: '#contact',
  },
  {
    tag: 'Enterprise',
    icon: 'enterprise',
    name: 'EnterpriseOS',
    description: 'A complete ERP system for modern organizations that need deep customization and compliance.',
    features: ['Modular ERP architecture', 'Role-based access control', 'Audit trails & compliance', 'White-label ready'],
    benefit: 'Adapts to your processes, not the other way around.',
    link: '#contact',
  },
  {
    tag: 'SaaS',
    icon: 'cloud',
    name: 'CloudStack Pro',
    description: 'Managed cloud infrastructure with automated scaling, cost optimization, and intelligent DevOps pipelines.',
    features: ['Auto-scaling microservices', 'CI/CD pipeline automation', 'Cost intelligence dashboard', '24/7 incident management'],
    benefit: 'Stay online under load without overpaying for servers.',
    link: '#contact',
  },
]

const Products = () => {
  return (
    <section
      id="products"
      className="dark:bg-[#06090F] py-20 px-4 sm:px-12 lg:px-24 xl:px-40"
    >
      {/* Header */}
      <motion.div {...inView} variants={stagger(0.12)}>
        <motion.h2 variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Our Products
        </motion.h2>
        <motion.h1 variants={fadeUp} className="mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-slate-700 dark:text-white">
          Ready-to-use platforms,{' '}
          <span className="bg-gradient-to-r from-[#4B8DB8] to-[#7FA8F5] bg-clip-text text-transparent">
            built to last.
          </span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-slate-500 dark:text-slate-400">
          Proven products you can adopt today, or customize to fit the way your business works.
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div {...inView} variants={stagger(0.15)} className="mt-16 grid gap-6 lg:grid-cols-2">
        {products.map((p) => (
          <motion.article
            key={p.name}
            variants={popUp}
            className={`group flex flex-col rounded-2xl border bg-white dark:bg-slate-900/40 p-8 shadow-sm transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-xl ${
              p.featured
                ? 'border-[#4B8DB8]/60 ring-1 ring-[#4B8DB8]/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-[#4B8DB8]/60'
            }`}
          >
            {/* Top row: icon + tag */}
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4B8DB8]/10 text-[#4B8DB8] transition-colors duration-300 group-hover:bg-[#4B8DB8] group-hover:text-white">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {icons[p.icon]}
                </svg>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  p.featured
                    ? 'bg-[#4B8DB8] text-white'
                    : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {p.tag}
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-medium tracking-tight text-slate-700 dark:text-white">{p.name}</h3>
            <p className="mt-3 leading-relaxed text-slate-500 dark:text-slate-400">{p.description}</p>

            {/* Features */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#4B8DB8]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            {/* Benefit + link */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{p.benefit}</p>
              <a href={p.link} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4B8DB8] transition-all hover:gap-3">
                Request a demo
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10h12M11 5l5 5-5 5" />
                </svg>
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default Products