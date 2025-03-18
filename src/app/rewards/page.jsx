export default function RewardsCatalogPage() {
  return (
    <section className={styles.catalogSection}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Royal Rewards Catalog</h2>
          <p>Explore our dual rewards program featuring exclusive Saint Daniels benefits and carrier-provided rewards</p>
        </div>

        <div className={styles.catalogCategories}>
          <div className={styles.category}>
            <h3 className={styles.categoryTitle}>Primary Healthcare Carrier Rewards</h3>
            <p className={styles.categoryDescription}>
              Your healthcare insurance carrier offers their own rewards program with valuable benefits like gift cards, 
              health devices, and medical bill credits. Contact your insurance agent to learn more about enrolling in 
              your carrier's primary rewards program.
            </p>
            <div className={styles.contactInfo}>
              <p>To access your carrier's rewards program:</p>
              <ul>
                <li>Contact your insurance agent</li>
                <li>Visit your carrier's member portal</li>
                <li>Call the number on your insurance card</li>
              </ul>
            </div>
          </div>

          <div className={styles.category}>
            <h3 className={styles.categoryTitle}>Saint Daniels Exclusive Rewards</h3>
            <p className={styles.categoryDescription}>
              Unique rewards available only to Saint Daniels members, carefully curated for your royal healthcare journey.
            </p>
            <div className={styles.rewardsGrid}>
              {rewards.map((reward, index) => (
                <div key={index} className={styles.rewardCard}>
                  <div 
                    className={styles.rewardImg} 
                    style={{ backgroundImage: `url(${reward.image})` }}
                  />
                  <div className={styles.rewardContent}>
                    <h3>{reward.title}</h3>
                    <div className={styles.points}>{reward.points} Points</div>
                    <p>{reward.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const rewards = [
  {
    image: '/images/fitness.jpg',
    title: 'Premium Gym Access',
    points: 1500,
    description: 'One-year membership to premium fitness centers with personal training sessions.'
  },
  {
    image: '/images/walgreens.jpg',
    title: '$5 Walgreens Gift Card',
    points: 500,
    description: 'Redeem for a $5 Walgreens gift card valid at any Walgreens location. Perfect for health and wellness purchases.'
  },
  {
    image: '/images/wearable.jpg',
    title: 'Royal Health Tech',
    points: 2000,
    description: 'Premium health monitoring devices to keep track of your vital health metrics.'
  }
] 