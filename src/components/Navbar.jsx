import React, { useState } from 'react'
import assets from '../assets/assets'
import ThemeToggleBtn from './ThemeToggleBtn'
import useActiveSection from './useActiveSection'
import { motion } from 'motion/react'

const links = [
  { label: 'Home', id: 'home', href: '#' },
  { label: 'Services', id: 'services', href: '#services' },
  { label: 'Products', id: 'products', href: '#products' },
  { label: 'Careers', id: 'careers', href: '#careers' },
  { label: 'About', id: 'about', href: '#about' },
  { label: 'Contact', id: 'contact', href: '#contact' },
]

// Every page section -> the nav item that should be underlined
const sectionToNav = {
  home: 'home',
  promises: 'home',
  value: 'home',
  services: 'services',
  'how-it-works': 'services',
  products: 'products',
  careers: 'careers',
  about: 'about',
  contact: 'contact',
  'start-project': 'contact',
}
const sectionIds = Object.keys(sectionToNav)

const Navbar = ({ theme, setTheme }) => {
  const [sidebar, setSidebar] = useState(false)
  const active = sectionToNav[useActiveSection(sectionIds)]

  const linkClass = (id) =>
    `relative w-fit py-1 transition-colors duration-300
     sm:after:absolute sm:after:left-0 sm:after:-bottom-0.5 sm:after:h-0.5 sm:after:w-full
     sm:after:origin-left sm:after:rounded-full sm:after:bg-[#2E6FA0] sm:dark:after:bg-[#7FB3D9]
     sm:after:transition-transform sm:after:duration-300
     ${
       active === id
         ? 'max-sm:font-bold sm:text-[#2E6FA0] sm:dark:text-[#7FB3D9] sm:after:scale-x-100'
         : 'sm:after:scale-x-0 sm:hover:after:scale-x-100'
     }`

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-white/50 dark:bg-gray-900/70 border-b border-gray-300 dark:border-gray-700 transition-all"
    >
      <a href="#" aria-label="Ventrix Technologies home">
        <img
          src="/src/assets/vlang.svg"
          className="w-15 sm:w-30 rounded-full h-7"
          alt="Ventrix Technologies"
        />
      </a>

      <div
        className={`
          text-gray-700 dark:text-white sm:text-sm
          max-sm:fixed max-sm:top-0 max-sm:bottom-0 max-sm:right-0
          max-sm:min-h-screen max-sm:h-full max-sm:flex-col
          max-sm:bg-primary max-sm:text-white max-sm:pt-20
          flex sm:items-center gap-5 transition-all
          ${sidebar ? 'max-sm:w-60 max-sm:pl-10' : 'max-sm:w-0 max-sm:overflow-hidden'}
        `}
      >
        <img
          src={assets.close_icon}
          alt=""
          className="w-5 absolute right-4 top-4 sm:hidden cursor-pointer"
          onClick={() => setSidebar(false)}
        />

        {links.map((l) => (
          <a
            key={l.id}
            href={l.href}
            onClick={() => setSidebar(false)}
            aria-current={active === l.id ? 'location' : undefined}
            className={linkClass(l.id)}
          >
            {l.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2 px-1 sm:gap-4">
        <ThemeToggleBtn theme={theme} setTheme={setTheme} />

        <img
          src={theme === 'dark' ? assets.menu_icon_dark : assets.menu_icon}
          alt=""
          onClick={() => setSidebar(true)}
          className="w-8 sm:hidden cursor-pointer"
        />

        <a
          href="https://api.whatsapp.com/send/?phone=917396149431&text=Hi+Ventrix+Technologies%2C+I%27d+like+to+know+more+about+your+services.&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm max-sm:hidden flex items-center gap-2 bg-[#2E6FA0] text-white px-6 py-2 rounded-full cursor-pointer hover:scale-105 transition-all"
        >
          Connect
          <img src={assets.arrow_icon} width={14} alt="" />
        </a>
      </div>
    </motion.div>
  )
}

export default Navbar