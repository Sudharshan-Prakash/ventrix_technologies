import React from "react";
import assets from "../assets/assets";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <div id='hero' className = "flex flex-col items-center gap-6 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden text-gray-700 dark:text-white dark:bg-[#06090F]"  >
      <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{duration: 0.5, delay: 0.2}}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 border border-gray-300 p-1.5 pr-4 rounded-full shadow-md" >
        <img className="w-20 "
        src={assets.group_profile} alt="Hero" />
        <p className = "text-xs font-medium"
        >98% Client Satisfaction</p>
      </motion.div>
      <motion.h1
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{duration: 0.6, delay: 0.8}}
      viewport={{ once: true }}
      className=" text-4xl sm:text-5xl md:text-6xl xl:text-[84px] font-medium xl:leading-[95px] max-w-5xl"
      >We build<span className="bg-gradient-to-r from-[#4B8DB8] to-[#90B7F2] bg-clip-text text-transparent" >Software</span> that works the day it ships.</motion.h1>
      <motion.p
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{duration: 0.5, delay: 1}}
      viewport={{ once: true }}
      className = "text-sm sm:text-lg font-medium text-gray-500 dark:text-white/75 max-w-4/5 sm:max-w-lg pb-3"
      >
        Websites, mobile apps and AI tools for growing businesses.Designed, built and supported by one accountable team.
      </motion.p>


      <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{duration: 0.5, delay: 2}}
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row gap-4">
        <a
          href="#start-project"
          className=" max-sm:hidden flex items-center gap-2 bg-[#4D8DBA] text-white px-6 py-2 rounded-full cursor-pointer hover:scale-105 transition-all"
        >
          Start Your Project
          <img src={assets.arrow_icon} width={14} alt="" />
        </a>
        <a
          href="#services"
          className="max-sm:hidden flex items-center gap-2 border border-gray-300 text-black dark:text-white px-6 py-2 rounded-full cursor-pointer hover:scale-105 transition-all"
        >
          See what we build
          
        </a>
      </motion.div>
    </div>
    
  );
};

export default Hero;