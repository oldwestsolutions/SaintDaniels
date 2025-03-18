import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import Loading from '@/components/Loading'
import { validateEmail } from '@/utils/validation'

const LoginSection = styled(motion.section)`
  padding: 100px 0;
  min-height: calc(100vh - 200px);
`

const LoginContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h2 {
    color: var(--primary-green);
    font-size: 2rem;
    margin-bottom: 10px;
  }
`

const Form = styled.form`
  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    color: var(--primary-green);
  }

  input {
    width: 100%;
    padding: 12px;
    border: 2px solid var(--light-green);
    border-radius: 8px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: var(--gold);
    }
  }

  button {
    width: 100%;
    padding: 15px;
    background: var(--gold);
    color: var(--primary-green);
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: var(--dark-gold);
    }
  }
`

const LoginFooter = styled.div`
  margin-top: 20px;
  text-align: center;

  a {
    color: var(--primary-green);
    text-decoration: none;
    margin: 0 10px;

    &:hover {
      color: var(--gold);
    }
  }
`

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 5px;
  text-align: center;
`

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const validateForm = () => {
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.password) {
      setError('Please enter your password')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/dashboard')
      } else {
        const data = await response.json()
        setError(data.message || 'Invalid email or password')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageTransition>
      <LoginSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <LoginContainer>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <LoginHeader>
                <h2>Welcome Back</h2>
                <p>Royal Member</p>
              </LoginHeader>
              <Form onSubmit={handleSubmit}>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      setError('')
                    }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value })
                      setError('')
                    }}
                    required
                  />
                </div>
                <button type="submit">Sign In</button>
              </Form>
              <LoginFooter>
                <Link href="/forgot-password">Forgot password?</Link>
                <Link href="/enrollment">Join The Kingdom</Link>
              </LoginFooter>
            </>
          )}
        </LoginContainer>
      </LoginSection>
    </PageTransition>
  )
} 