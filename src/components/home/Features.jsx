import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ShieldCheck, Crown, GiftIcon } from '@heroicons/react/24/outline'

const FeaturesSection = styled.section`
  padding: 100px 0;
  background: white;
`

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 60px;
`

const FeatureCard = styled(motion.div)`
  padding: 40px;
  background: var(--light-tan);
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  svg {
    width: 60px;
    height: 60px;
    color: var(--gold);
    margin-bottom: 20px;
  }

  h3 {
    color: var(--primary-green);
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  p {
    color: var(--secondary-green);
    font-size: 1.1rem;
  }
`

const SectionTitle = styled.h2`
  text-align: center;
  color: var(--primary-green);
  font-size: 2.5rem;
  margin-bottom: 20px;
`

function Features() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Premium Healthcare",
      description: "Access to quality healthcare services and exclusive provider networks."
    },
    {
      icon: Crown,
      title: "Royal Rewards",
      description: "Earn points for every healthcare decision and wellness activity."
    },
    {
      icon: GiftIcon,
      title: "Exclusive Benefits",
      description: "Redeem your points for healthcare rewards and premium services."
    }
  ]

  return (
    <FeaturesSection>
      <FeaturesContainer>
        <SectionTitle>Royal Benefits</SectionTitle>
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <feature.icon />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeaturesContainer>
    </FeaturesSection>
  )
}

export default Features 