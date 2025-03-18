import styled from 'styled-components'
import { motion } from 'framer-motion'

const HowItWorksSection = styled.section`
  padding: 100px 0;
  background: var(--light-tan);
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

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`

const Step = styled(motion.div)`
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
`

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  background: var(--gold);
  color: var(--primary-green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 20px;
`

function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Join The Kingdom",
      description: "Register for a Saint Daniels account and link your healthcare providers."
    },
    {
      number: "2",
      title: "Earn Royal Points",
      description: "Collect points for healthcare visits, wellness activities, and healthy choices."
    },
    {
      number: "3",
      title: "Claim Your Treasures",
      description: "Redeem your points for healthcare rewards and exclusive benefits."
    }
  ]

  return (
    <HowItWorksSection>
      <Container>
        <SectionTitle>
          <h2>Royal Decree: How It Works</h2>
        </SectionTitle>
        <Steps>
          {steps.map((step, index) => (
            <Step
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <StepNumber>{step.number}</StepNumber>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Step>
          ))}
        </Steps>
      </Container>
    </HowItWorksSection>
  )
}

export default HowItWorks 