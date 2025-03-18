import Link from 'next/link'
import styles from './thank-you.module.css'

export default function ThankYouPage() {
  return (
    <div className={styles.thankYouSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Welcome to the Kingdom!</h1>
          <p>Thank you for enrolling in Saint Daniels Healthcare Rewards. We're excited to have you join our royal family.</p>
          <p>Please check your email for further instructions and your DocuSign agreement.</p>
          
          <div className={styles.nextSteps}>
            <h2>Next Steps:</h2>
            <ol>
              <li>Check your email for verification</li>
              <li>Complete the DocuSign agreement</li>
              <li>Set up your account preferences</li>
              <li>Start earning royal rewards!</li>
            </ol>
          </div>

          <div className={styles.actions}>
            <Link href="/login" className={styles.primaryBtn}>
              Login to Your Account
            </Link>
            <Link href="/help" className={styles.secondaryBtn}>
              Visit Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 