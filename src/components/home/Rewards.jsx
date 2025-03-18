import Image from 'next/image'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const RewardsSection = styled.section`
  padding: 100px 0;
  background: white;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 60px;

  h2 {
    color: var(--primary-green);
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
`

const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`

const RewardCard = styled(motion.div)`
  background: var(--light-tan);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const RewardImage = styled.div`
  position: relative;
  height: 200px;
  width: 100%;
`

const RewardContent = styled.div`
  padding: 25px;

  h3 {
    color: var(--primary-green);
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .points {
    color: var(--gold);
    font-weight: bold;
    margin-bottom: 15px;
  }

  p {
    color: var(--secondary-green);
  }
`

function Rewards() {
  const rewards = [
    {
      image: "/images/fitness.jpeg",
      title: "Premium Gym Access",
      points: "5,000 Points",
      description: "Get access to premium gym facilities to support your fitness journey."
    },
    {
      image: "/images/walgreens.jpeg",
      title: "$5 Walgreens Gift Card",
      points: "500 Points",
      description: "Redeem your points for a Walgreens gift card to use on health and wellness products."
    },
    {
      image: "/images/wearable.jpeg",
      title: "Royal Health Tech",
      points: "2,000 Points",
      description: "Premium health monitoring devices to keep track of your vital health metrics."
    }
  ]

  return (
    <RewardsSection>
      <Container>
        <SectionTitle>
          <h2>Royal Treasures</h2>
        </SectionTitle>
        <RewardsGrid>
          {rewards.map((reward, index) => (
            <RewardCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <RewardImage>
                <Image
                  src={reward.image}
                  alt={reward.title}
                  layout="fill"
                  objectFit="cover"
                />
              </RewardImage>
              <RewardContent>
                <h3>{reward.title}</h3>
                <div className="points">{reward.points}</div>
                <p>{reward.description}</p>
              </RewardContent>
            </RewardCard>
          ))}
        </RewardsGrid>
      </Container>
    </RewardsSection>
  )
}

export default Rewards 