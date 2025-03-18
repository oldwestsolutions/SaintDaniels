import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import PageTransition from '@/components/PageTransition'
import Loading from '@/components/Loading'
import { validateForm } from '@/utils/validation'
import { motion } from 'framer-motion'

const EnrollmentSection = styled(motion.section)`
  padding: 50px 0;
  min-height: calc(100vh - 200px);
`

const EnrollmentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const FormStep = styled(motion.div)`
  display: ${props => props.active ? 'block' : 'none'};
`

const FormSection = styled.div`
  margin-bottom: 30px;

  .title-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;

    h3 {
      color: var(--primary-green);
      font-size: 1.8rem;
    }

    .star {
      color: var(--gold);
    }
  }
`

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    color: var(--primary-green);
  }

  input, select {
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
`

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  button {
    padding: 12px 25px;
    background: var(--gold);
    color: var(--primary-green);
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: var(--dark-gold);
    }

    &.prev {
      background: var(--light-tan);
    }
  }
`

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 5px;
`

const SuccessMessage = styled.div`
  color: #28a745;
  font-size: 0.875rem;
  margin-top: 5px;
`

export default function Enrollment() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    ssn: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    coverage: '',
    occupation: '',
    income: ''
  })

  const validateStep = (step) => {
    const stepFields = {
      1: ['firstName', 'lastName', 'email', 'phone'],
      2: ['dob', 'ssn'],
      3: ['address', 'city', 'state', 'zip'],
      4: ['coverage', 'occupation', 'income']
    }

    const stepData = {}
    stepFields[step].forEach(field => {
      stepData[field] = formData[field]
    })

    const stepErrors = validateForm(stepData)
    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep(currentStep)) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/enrollment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/thank-you')
      } else {
        const data = await response.json()
        setErrors({ submit: data.message || 'Enrollment failed. Please try again.' })
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => setCurrentStep(prev => prev - 1)

  return (
    <PageTransition>
      <EnrollmentSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <EnrollmentContainer>
          {isLoading ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit}>
              <FormStep active={currentStep === 1}>
                <FormSection>
                  <div className="title-row">
                    <h3>Personal Information</h3>
                    <span className="star">✦</span>
                  </div>
                  <FormGroup>
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({ ...formData, firstName: e.target.value })
                        if (errors.firstName) {
                          setErrors({ ...errors, firstName: null })
                        }
                      }}
                    />
                    {errors.firstName && (
                      <ErrorMessage>{errors.firstName}</ErrorMessage>
                    )}
                  </FormGroup>
                  {/* Add more personal info fields */}
                </FormSection>
                <Navigation>
                  <button type="button" onClick={nextStep}>Continue</button>
                </Navigation>
              </FormStep>

              {/* Add more form steps */}

              <FormStep active={currentStep === 4}>
                <FormSection>
                  <div className="title-row">
                    <h3>Review & Submit</h3>
                    <span className="star">✦</span>
                  </div>
                  {/* Add review summary */}
                </FormSection>
                <Navigation>
                  <button type="button" className="prev" onClick={prevStep}>Back</button>
                  <button type="submit">Submit Enrollment</button>
                </Navigation>
              </FormStep>

              {errors.submit && (
                <ErrorMessage style={{ textAlign: 'center', marginTop: '20px' }}>
                  {errors.submit}
                </ErrorMessage>
              )}
            </form>
          )}
        </EnrollmentContainer>
      </EnrollmentSection>
    </PageTransition>
  )
} 