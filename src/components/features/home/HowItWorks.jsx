'use client'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ProcessSection = styled.section`
  padding: 4rem 2rem;
  background: var(--light-tan);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    color: var(--primary-green);
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: var(--secondary-green);
    font-size: 1.2rem;
  }
`;

const ImportantNotice = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;

  h3 {
    color: var(--primary-green);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: var(--secondary-green);
    line-height: 1.6;
  }
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const StepCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  .step-number {
    color: var(--gold);
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  h3 {
    color: var(--primary-green);
    margin-bottom: 1rem;
  }

  p {
    color: var(--secondary-green);
  }
`;

const steps = [
  {
    number: '01',
    title: 'Enroll',
    description: 'Sign up for Saint Daniels Healthcare Rewards program.'
  },
  {
    number: '02',
    title: 'Earn Points',
    description: 'Make healthy choices and earn points with every healthcare decision.'
  },
  {
    number: '03',
    title: 'Redeem',
    description: 'Use your points for exclusive healthcare and lifestyle rewards.'
  }
];

export default function HowItWorks() {
  return (
    <ProcessSection>
      <Container>
        <SectionTitle>
          <h2>How It Works</h2>
          <p>Your journey to royal healthcare rewards starts here</p>
        </SectionTitle>

        <ImportantNotice
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Important Information About Rewards</h3>
          <p>
            Please note that your primary rewards will be provided through your 
            selected insurance carrier. Saint Daniels offers additional exclusive 
            rewards to enhance your healthcare journey.
          </p>
        </ImportantNotice>

        <StepsContainer>
          {steps.map((step, index) => (
            <StepCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </StepCard>
          ))}
        </StepsContainer>
      </Container>
    </ProcessSection>
  );
} 