import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import NegativeStakes from './components/NegativeStakes'
import Value from './components/Value'
import HowItWorks from './components/HowItWorks'
import Service from './components/Service'
import { useState } from 'react'
import Products from './components/Products'
import Careers from './components/Careers'
import About from './components/About'
import StartYourProject from './components/StartYourProject'
import Contact from './components/Contact'
import Footer from './components/Footer'

const App = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  return (
    <div  className = 'dark:bg-black relative'>
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <NegativeStakes />
      <Value />
      <HowItWorks />
      <Service />
      <Products />
      <Careers />
      <About />
      <StartYourProject />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
