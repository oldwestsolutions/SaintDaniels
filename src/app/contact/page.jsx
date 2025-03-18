'use client'

import styles from './contact.module.css'

export default function ContactPage() {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Contact Us</h2>
          <p>We're here to help with any questions about your healthcare rewards journey.</p>
        </div>

        <div className={styles.contactInfo}>
          <div className={styles.contactMethod}>
            <span className={styles.contactIcon}>📧</span>
            <a href="mailto:support@saintdaniels.com" className={styles.contactLink}>
              support@saintdaniels.com
            </a>
          </div>
          <div className={styles.contactMethod}>
            <span className={styles.contactIcon}>📞</span>
            <a href="tel:+18883381832" className={styles.contactLink}>
              (888) 338-1832
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 