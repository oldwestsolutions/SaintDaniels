import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`

const HeroContent = styled(motion.div)`
  color: var(--primary-tan);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  max-width: 600px;

  h2 {
    font-size: 4rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }
`

const HeroButton = styled(motion.a)`
  display: inline-block;
  padding: 15px 30px;
  background: var(--gold);
  color: var(--primary-green);
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`

function Hero() {
  return (
    <HeroSection>
      <Image
        src="/images/hero-bg.jpg"
        alt="Healthcare background"
        layout="fill"
        objectFit="cover"
        priority
        quality={100}
      />
      <HeroContainer>
        <HeroContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Royal Healthcare</h2>
          <p>Earn points with every healthcare decision and redeem them for exclusive rewards. Experience healthcare fit for royalty with Saint Daniels.</p>
          <Link href="/enrollment" passHref>
            <HeroButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join The Kingdom
            </HeroButton>
          </Link>
        </HeroContent>
      </HeroContainer>
    </HeroSection>
  )
}

export default Hero 