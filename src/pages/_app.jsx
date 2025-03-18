import '@/styles/globals.css'
import { DefaultSeo } from 'next-seo'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  return (
    <>
      <DefaultSeo
        title="Saint Daniels Healthcare Rewards"
        description="Experience healthcare fit for royalty with Saint Daniels. Earn points with every healthcare decision and redeem them for exclusive rewards."
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://saintdaniels.com',
          siteName: 'Saint Daniels Healthcare Rewards',
          images: [
            {
              url: 'https://saintdaniels.com/saint-daniels-social.jpg',
              width: 1200,
              height: 630,
              alt: 'Saint Daniels Healthcare Rewards',
            },
          ],
        }}
      />
      <Header />
      <AnimatePresence mode='wait'>
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default MyApp 