'use client'

import { useState } from 'react'
import styles from './help-center.module.css'

export default function HelpCenter() {
  const [activeFaq, setActiveFaq] = useState(null)

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <section className={styles.helpSection}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Help Center</h2>
          <p>Find answers to common questions and access important documents.</p>
        </div>

        <div className={styles.faqSection}>
          {/* FAQ items */}
        </div>

        <div className={styles.documentsSection}>
          {/* Document cards */}
        </div>
      </div>
    </section>
  )
} 