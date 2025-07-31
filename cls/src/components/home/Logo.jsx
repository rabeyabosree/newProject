import React from 'react'
import { motion } from 'framer-motion'

function Logo() {
  return (
    <motion.h1
      className='text-xl font-bold text-blue-600'
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      SkillBot
    </motion.h1>
  )
}

export default Logo
