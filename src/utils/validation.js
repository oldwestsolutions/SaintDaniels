export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone) => {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  return re.test(phone)
}

export const validateSSN = (ssn) => {
  const re = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/
  return re.test(ssn)
}

export const validateZip = (zip) => {
  const re = /^\d{5}(-\d{4})?$/
  return re.test(zip)
}

export const validateForm = (formData) => {
  const errors = {}

  if (!formData.firstName?.trim()) errors.firstName = 'First name is required'
  if (!formData.lastName?.trim()) errors.lastName = 'Last name is required'
  if (!validateEmail(formData.email)) errors.email = 'Valid email is required'
  if (!validatePhone(formData.phone)) errors.phone = 'Valid phone number is required'
  if (!formData.dob) errors.dob = 'Date of birth is required'
  if (!validateSSN(formData.ssn)) errors.ssn = 'Valid SSN is required'
  if (!formData.address?.trim()) errors.address = 'Address is required'
  if (!formData.city?.trim()) errors.city = 'City is required'
  if (!formData.state?.trim()) errors.state = 'State is required'
  if (!validateZip(formData.zip)) errors.zip = 'Valid ZIP code is required'

  return errors
} 