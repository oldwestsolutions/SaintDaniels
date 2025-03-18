'use client'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const PageWrapper = styled(motion.div)`
  position: relative;
`

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
}

export default function PageTransition({ children }) {
  return (
    <PageWrapper
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </PageWrapper>
  )
} 