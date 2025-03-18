'use client'
import Link from 'next/link'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ThankYouSection = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--light-tan);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  color: var(--primary-green);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  color: var(--secondary-green);
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const NextSteps = styled.div`
  margin: 2rem 0;
  text-align: left;

  h2 {
    color: var(--primary-green);
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  ol {
    list-style-position: inside;
    color: var(--secondary-green);

    li {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(Link)`
  background: var(--gold);
  color: var(--primary-green);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(Link)`
  background: var(--primary-green);
  color: var(--primary-tan);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export default function ThankYou() {
  return (
    <ThankYouSection>
      <Container
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Welcome to the Kingdom!</Title>
        <Description>
          Thank you for enrolling in Saint Daniels Healthcare Rewards. 
          We're excited to have you join our royal family.
        </Description>
        <Description>
          Please check your email for further instructions and your DocuSign agreement.
        </Description>
        
        <NextSteps>
          <h2>Next Steps:</h2>
          <ol>
            <li>Check your email for verification</li>
            <li>Complete the DocuSign agreement</li>
            <li>Set up your account preferences</li>
            <li>Start earning royal rewards!</li>
          </ol>
        </NextSteps>

        <Actions>
          <PrimaryButton href="/login">
            Login to Your Account
          </PrimaryButton>
          <SecondaryButton href="/help">
            Visit Help Center
          </SecondaryButton>
        </Actions>
      </Container>
    </ThankYouSection>
  );
} 