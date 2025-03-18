'use client'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const RewardsSection = styled.section`
  padding: 4rem 2rem;
  background: var(--light-tan);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Category = styled.div`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h3`
  color: var(--primary-green);
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const CategoryDescription = styled.p`
  color: var(--secondary-green);
  margin-bottom: 2rem;
`;

const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const RewardCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RewardImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
`;

const RewardContent = styled.div`
  padding: 1.5rem;

  h3 {
    color: var(--primary-green);
    margin-bottom: 0.5rem;
  }

  .points {
    color: var(--gold);
    font-weight: bold;
    margin-bottom: 1rem;
  }

  p {
    color: var(--secondary-green);
  }
`;

export default function RewardsComponent() {
  return (
    <RewardsSection>
      <Container>
        <Category>
          <CategoryTitle>Saint Daniels Exclusive Rewards</CategoryTitle>
          <CategoryDescription>
            Unique rewards available only to Saint Daniels members, carefully curated for your royal healthcare journey.
          </CategoryDescription>
          <RewardsGrid>
            {rewards.map((reward, index) => (
              <RewardCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <RewardImage style={{ backgroundImage: `url(${reward.image})` }} />
                <RewardContent>
                  <h3>{reward.title}</h3>
                  <div className="points">{reward.points} Points</div>
                  <p>{reward.description}</p>
                </RewardContent>
              </RewardCard>
            ))}
          </RewardsGrid>
        </Category>
      </Container>
    </RewardsSection>
  );
}

const rewards = [
  {
    image: '/images/fitness.jpg',
    title: 'Premium Gym Access',
    points: 1500,
    description: 'One-year membership to premium fitness centers with personal training sessions.'
  },
  {
    image: '/images/walgreens.jpg',
    title: '$5 Walgreens Gift Card',
    points: 500,
    description: 'Redeem for a $5 Walgreens gift card valid at any Walgreens location.'
  },
  {
    image: '/images/wearable.jpg',
    title: 'Royal Health Tech',
    points: 2000,
    description: 'Premium health monitoring devices to keep track of your vital health metrics.'
  }
]; 