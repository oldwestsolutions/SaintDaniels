'use client'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background: white;
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: var(--light-tan);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;

  .icon {
    font-size: 3rem;
    color: var(--gold);
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

const features = [
  {
    icon: '🏆',
    title: 'Earn Points',
    description: 'Get rewarded for every healthcare decision you make.'
  },
  {
    icon: '💎',
    title: 'Premium Rewards',
    description: 'Redeem points for exclusive healthcare and lifestyle benefits.'
  },
  {
    icon: '🌟',
    title: 'VIP Treatment',
    description: 'Experience healthcare services fit for royalty.'
  }
];

export default function Features() {
  return (
    <FeaturesSection>
      <Container>
        <SectionTitle>
          <h2>Royal Benefits</h2>
          <p>Experience healthcare rewards like never before</p>
        </SectionTitle>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </FeaturesSection>
  );
} 