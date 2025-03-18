import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  background-color: var(--primary-green);
  color: var(--primary-tan);
  padding: 15px 0;
  border-bottom: 5px solid var(--gold);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &.hidden {
    transform: translateY(-100%);
  }
`

const Nav = styled.nav`
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  h1 {
    font-size: 2.2rem;
    margin-left: 15px;
    color: var(--primary-tan);
  }
`

const NavButton = styled.a`
  background-color: var(--gold);
  color: var(--primary-green);
  padding: 8px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--dark-gold);
    transform: translateY(-2px);
  }
`

function Header() {
  return (
    <HeaderContainer>
      <Nav>
        <div className="container">
          <Link href="/" passHref>
            <Logo>
              <Image
                src="/images/saint-daniels-logo.jpeg"
                alt="Saint Daniels Logo"
                width={60}
                height={60}
                objectFit="contain"
              />
              <h1>Saint Daniels</h1>
            </Logo>
          </Link>
          <Link href="/login" passHref>
            <NavButton>Login</NavButton>
          </Link>
        </div>
      </Nav>
    </HeaderContainer>
  )
}

export default Header 