'use client'

import { useEffect } from 'react'
import styles from './error.module.css'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className={styles.errorPage}>
      <div className={styles.errorContent}>
        <h1>Something went wrong!</h1>
        <p>We apologize for the inconvenience. Our team has been notified and is working on the issue.</p>
        
        <div className={styles.errorActions}>
          <button
            onClick={() => reset()}
            className={styles.retryButton}
          >
            Try again
          </button>
          
          <a href="/" className={styles.homeLink}>
            Return to Homepage
          </a>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className={styles.errorDetails}>
            <p>Error: {error.message}</p>
            {error.digest && (
              <p className={styles.errorDigest}>
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 