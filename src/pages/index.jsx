import PageTransition from '@/components/PageTransition'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import HowItWorks from '@/components/home/HowItWorks'
import Rewards from '@/components/home/Rewards'
import Testimonials from '@/components/home/Testimonials'

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Rewards />
        <Testimonials />
      </main>
    </PageTransition>
  )
} 