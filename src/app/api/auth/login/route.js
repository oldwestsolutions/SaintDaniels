export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Add your authentication logic here
    // Example:
    // const user = await authenticateUser(email, password)
    
    // For demo purposes:
    if (email && password) {
      return Response.json({ 
        message: 'Login successful',
        token: 'demo-token',
        user: { email }
      })
    } else {
      return Response.json({ message: 'Invalid credentials' }, { status: 401 })
    }
  } catch (error) {
    console.error('Login error:', error)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
} 