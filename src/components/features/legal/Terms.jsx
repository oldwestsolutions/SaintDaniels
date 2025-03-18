'use client'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const LegalSection = styled.div`
  padding: 4rem 2rem;
  background: var(--light-tan);
`;

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    color: var(--primary-green);
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const Content = styled.div`
  section {
    margin-bottom: 2rem;
  }

  h2 {
    color: var(--primary-green);
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: var(--secondary-green);
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  ul {
    list-style: disc;
    margin-left: 1.5rem;
    color: var(--secondary-green);
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

export default function Terms() {
  return (
    <LegalSection>
      <Container
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Terms of Service</h1>
        <Content>
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using Saint Daniels Healthcare Rewards services, you agree to be bound by these Terms of Service.</p>
          </section>

          <section>
            <h2>2. Program Eligibility</h2>
            <p>Eligibility for the Saint Daniels Healthcare Rewards program requires:</p>
            <ul>
              <li>Active enrollment with a participating insurance carrier</li>
              <li>Completion of the enrollment process</li>
              <li>Agreement to program terms and conditions</li>
            </ul>
          </section>
        </Content>
      </Container>
    </LegalSection>
  )
} 