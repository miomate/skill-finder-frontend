import AuthForm from '../components/AuthForm'

const SignupPage = () => {
  const handleSignup = async credentials => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include', // Include credentials (cookies) with the request
      })

      if (response.status === 201) {
        console.log('User created')
        // Optionally, you can redirect the user to the login page or dashboard here
      } else {
        const errorData = await response.json()
        console.log('Error:', errorData.message || 'Signup failed')
        // You can add error handling here for the user to see
      }
    } catch (error) {
      console.log(error)
      // Display error message to the user here
    }
  }

  return (
    <>
      <h1>Sign Up</h1>
      <AuthForm submitCallback={handleSignup} />
    </>
  )
}

export default SignupPage
