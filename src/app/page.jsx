'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Rewards from "@/components/home/Rewards";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h2>Royal Healthcare</h2>
            <p>Earn points with every healthcare decision and redeem them for exclusive rewards. Experience healthcare fit for royalty with Saint Daniels.</p>
            <Link href="/enrollment" className={styles.btn}>
              Join The Kingdom
            </Link>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className={styles.rewards} id="rewards">
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>Royal Treasures</h2>
          </div>
          <div className={styles.rewardsGrid}>
            {/* Reward Cards */}
          </div>
        </div>
      </section>

      {/* Other sections... */}
      <Features />
      <HowItWorks />
      <Rewards />
      <Testimonials />
    </>
  );
} 