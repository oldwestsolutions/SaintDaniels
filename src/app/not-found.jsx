import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.errorPage}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/" className={styles.homeLink}>
        Return to Homepage
      </Link>
    </div>
  )
} 