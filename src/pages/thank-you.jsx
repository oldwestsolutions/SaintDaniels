import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { CheckCircle } from '@heroicons/react/24/outline'

const ThankYouSection = styled(motion.section)`
  padding: 100px 0;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
`

const ThankYouContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 60px 40px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const SuccessIcon = styled(CheckCircle)`
  width: 80px;
  height: 80px;
  color: var(--gold);
  margin-bottom: 30px;
`

const Title = styled.h2`
  color: var(--primary-green);
  font-size: 2.5rem;
  margin-bottom: 20px;
`

const Message = styled.p`
  color: var(--secondary-green);
  font-size: 1.2rem;
  margin-bottom: 30px;
`

export default function ThankYou() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <ThankYouSection
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <ThankYouContainer>
        <SuccessIcon />
        <Title>Thank You for Joining Our Kingdom!</Title>
        <Message>
          Your enrollment has been successfully submitted. You will receive a confirmation
          email shortly with your next steps.
        </Message>
        <Message>
          Redirecting to homepage in 5 seconds...
        </Message>
      </ThankYouContainer>
    </ThankYouSection>
  )
} 