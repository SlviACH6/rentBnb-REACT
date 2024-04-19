import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  // State
  const [emailisValid, setEmailIsValid] = useState(true)
  const [error, setError] = useState('')
  // Functions
  const navigate = useNavigate()
  const validateEmail = (email) => {
    if (email.includes('@') && email.includes('.')) {
      setEmailIsValid(true)
    } else {
      setEmailIsValid(false)
    }
  }
  const submitForm = async (e) => {
    e.preventDefault()

    const response = await axios.post('https://haiku-bnb.onrender.com/login', {
      email: e.target.email.value,
      password: e.target.password.value
    })
    if (response.data.error) {
      setError(response.data.error)
    } else {
      localStorage.setItem('isLoggedIn', true)
      navigate('/')
    }
  }

  return (
    <div className=" w-[400px] mx-auto">
      {/*form*/}
      <form
        onSubmit={submitForm}
        className="flex flex-col mt-16  p-10 border-2 border-gray-300 rounded-lg"
      >
        {/*logo*/}
        <img
          src="https://res.cloudinary.com/dsko6ntfj/image/upload/v1642399114/portal/web%20development%20beginners/05%20Project%20Airbnb/assets/logo-airbnb.png
"
          alt="airbnb logo"
          className="h-6 w-20 mb-6"
        />
        {/*email*/}
        <div className="">
          <label>Email</label>
        </div>
        {!emailisValid && (
          <span className="bg text-red-500"> Invalid Email</span>
        )}
        <input
          name="email"
          onChange={(e) => validateEmail(e.target.value)}
          className="border-2 p-3 border-gray-300 rounded-lg mb-5 w-full"
          type="email"
          placeholder="email@example.com"
        />
        {/*password*/}
        <div className="">
          <label>Password</label>
        </div>
        <input
          name="password"
          className="border-2 p-3 border-gray-300 rounded-lg mb-5 w-full"
          type="password"
          placeholder="password here"
        />
        {/*button*/}
        <button className="p-3 w-full mb-5 bg-red-400 text-white text-center font-bold border rounded-lg">
          Login
        </button>
        <span className="bg text-red-500"> {error} </span>
        {/*signup link*/}
        <div className=" mb-6">
          New to Airbnb?
          <span className="text-red-400 font-bold"> Create an Account</span>
        </div>
      </form>
    </div>
  )
}

export default Login
