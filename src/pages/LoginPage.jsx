import { useContext } from 'react'
import AuthForm from '../components/AuthForm'
import { SessionContext } from '../contexts/SessionContext'

const LoginPage = () => {
  const { setToken } = useContext(SessionContext)

  const handleLogin = async credentials => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include', // Include credentials (cookies) with the request
      })

      if (response.status === 200) {
        const data = await response.json()
        console.log(data)
        setToken(data.token)
      } else {
        const errorData = await response.json()
        console.log('Error:', errorData.message || 'Login failed')
        // You can add error handling here for the user to see
      }
    } catch (error) {
      console.log(error)
      // Display error message to the user here
    }
  }

  return (
    <>
      <h1>Login</h1>
      <AuthForm submitCallback={handleLogin} />
    </>
  )
}

export default LoginPage
