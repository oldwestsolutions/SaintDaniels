'use client'

import { useEffect, useState } from 'react'
import styles from './dashboard.module.css'

export default function Dashboard() {
  const [userPoints, setUserPoints] = useState(0)
  const [rewards, setRewards] = useState([])

  return (
    <main className={styles.mainContent}>
      <div className={styles.accountStatus}>
        {/* Account status content */}
      </div>

      <div className={styles.availableOffers}>
        {/* Rewards content */}
      </div>

      <div className={styles.recentActivity}>
        {/* Activity list */}
      </div>
    </main>
  )
} 