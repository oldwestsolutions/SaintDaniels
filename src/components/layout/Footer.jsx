import Link from 'next/link'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: var(--primary-green);
  color: var(--primary-tan);
  padding: 60px 0 20px;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`

const FooterColumn = styled.div`
  h3 {
    color: var(--gold);
    margin-bottom: 20px;
    font-size: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: var(--primary-tan);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--gold);
    }
  }
`

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--gold);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-green);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }
  }
`

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--gold);
`

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <h3>Saint Daniels</h3>
          <p>Elevating healthcare experiences with rewards fit for royalty.</p>
          <SocialIcons>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">t</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Instagram">ig</a>
          </SocialIcons>
        </FooterColumn>

        <FooterColumn>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/how-it-works">How It Works</Link></li>
            <li><Link href="/rewards-catalog">Rewards Catalog</Link></li>
            <li><Link href="/partner-providers">Partner Providers</Link></li>
          </ul>
        </FooterColumn>

        <FooterColumn>
          <h3>Support</h3>
          <ul>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/help-center">Help Center</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        <p>&copy; {new Date().getFullYear()} Saint Daniels Healthcare Rewards. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  )
}

export default Footer 