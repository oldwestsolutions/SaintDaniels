export default function TermsOfServicePage() {
  return (
    <div className={styles.legalSection}>
      <div className={styles.container}>
        <h1>Terms of Service</h1>
        <div className={styles.content}>
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using Saint Daniels Healthcare Rewards services, you agree to be bound by these Terms of Service.</p>
          </section>

          <section>
            <h2>2. Program Eligibility</h2>
            <p>Eligibility for the Saint Daniels Healthcare Rewards program requires:</p>
            <ul>
              <li>Active enrollment with a participating insurance carrier</li>
              <li>Completion of the enrollment process</li>
              <li>Agreement to program terms and conditions</li>
            </ul>
          </section>
          
          {/* Add more terms sections */}
        </div>
      </div>
    </div>
  )
} 