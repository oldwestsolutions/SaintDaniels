'use client'

import { useEffect, useState } from 'react'
import styles from './dashboard.module.css'

export default function MemberDashboardPage() {
  const [userPoints, setUserPoints] = useState(0)
  const [rewards, setRewards] = useState([])

  return (
    <main className={styles.mainContent}>
      <div className={styles.accountStatus}>
        <div className={styles.pointsCard}>
          <h3>Your Royal Points</h3>
          <div className={styles.pointsBalance}>{userPoints}</div>
        </div>
      </div>

      <div className={styles.availableOffers}>
        <h3>Available Rewards</h3>
        <div className={styles.offersGrid}>
          {rewards.map((reward, index) => (
            <div key={index} className={styles.offerCard}>
              {/* Reward card content */}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h3>Points History</h3>
        <ul className={styles.activityList}>
          {/* Activity items */}
        </ul>
      </div>
    </main>
  )
} 