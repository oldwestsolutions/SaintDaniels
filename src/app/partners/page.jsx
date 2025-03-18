export default function PartnersPage() {
  return (
    <section className={styles.partnersSection}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Our Royal Partners</h2>
          <p>Discover our network of premium healthcare providers dedicated to your well-being</p>
        </div>

        <div className={styles.partnersGrid}>
          {partners.map((partner, index) => (
            <div key={index} className={styles.partnerCard}>
              <div className={styles.partnerIcon}>{partner.icon}</div>
              <h3>{partner.name}</h3>
              <p>{partner.description}</p>
              <div className={styles.partnerSpecialties}>
                {partner.specialties.map((specialty, idx) => (
                  <span key={idx} className={styles.specialtyTag}>
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const partners = [
  {
    icon: '🏛️',
    name: 'Centuries Mutual',
    description: 'Leading insurance provider offering comprehensive healthcare coverage with exceptional benefits and service.',
    specialties: ['Health Insurance', 'Medicare', 'Dental & Vision']
  },
  {
    icon: '💰',
    name: 'Subsidy Check',
    description: 'Expert financial services helping members maximize their healthcare subsidies and benefits.',
    specialties: ['Subsidy Assessment', 'Benefit Analysis', 'Financial Planning']
  },
  {
    icon: '🏠',
    name: 'Home Healthcare Services',
    description: 'Premium in-home healthcare services providing personalized care in the comfort of your home.',
    specialties: ['Home Care', 'Medical Equipment', 'Rehabilitation']
  }
] 