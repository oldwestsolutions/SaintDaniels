export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const formData = req.body

    // Add validation here
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Add your API logic here (e.g., Salesforce integration)
    // Example:
    // await sendToSalesforce(formData)
    // await sendConfirmationEmail(formData.email)

    res.status(200).json({ message: 'Enrollment submitted successfully' })
  } catch (error) {
    console.error('Enrollment error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 