export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    // Add your authentication logic here
    // Example:
    // const user = await authenticateUser(email, password)
    
    // For demo purposes:
    if (email && password) {
      res.status(200).json({ 
        message: 'Login successful',
        token: 'demo-token',
        user: { email }
      })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 