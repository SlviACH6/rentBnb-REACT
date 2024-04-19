import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

axios.defaults.withCredentials = true

function Signup() {
  //STATE values
  const [validEmail, setValidEmail] = useState(true)
  const [validPassword, setValidPassword] = useState(true)
  const [error, setError] = useState('')

  //navigation hook
  const navigate = useNavigate()

  //FORM
  const submitForm = async (e) => {
    //prevent the form to be submited
    e.preventDefault()
    //data from the form into an object
    let form = new FormData(e.target)
    let formObject = Object.fromEntries(form.entries())
    //POST request
    const response = await axios.post(
      'https://haiku-bnb.onrender.com/signup',
      formObject
    )
    //sending back the response as an error otherwise navigate to home
    if (response.data.error) {
      setError(response.data.error)
    } else if (response.data.error) {
      setError(response.data.message)
    } else {
      localStorage.setItem('isLoggedIn', true)

      navigate('/')
    }
  }

  //VALIDATE EMAIL
  const validateEmail = (email) => {
    if ((email.includes('@') && email.includes('.')) || !email) {
      setValidEmail(true)
    } else {
      console.log('Email is not valid')
      setValidEmail(false)
    }
  }
  //VALIDATE PASSWORD
  const validatePassword = (password) => {
    if (password.length < 6 || !password) {
      setValidPassword(false)
    } else {
      setValidPassword(true)
    }
  }

  return (
    <div className=" rounded-md w-80 mx-auto mt-16 border-2 p-4">
      <form className="grid gap-2 w-full " onSubmit={(e) => submitForm(e)}>
        <span className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dsko6ntfj/image/upload/v1642399114/portal/web%20development%20beginners/05%20Project%20Airbnb/assets/logo-airbnb.png"
            className="h-6"
          />
        </span>
        {/* First Name */}
        <label className="text-slate-500 text-sm">First Name</label>
        <input
          className="border rounded-md h-10 px-2"
          type="text"
          name="first_name"
        />

        {/* Last Name */}
        <label className="text-slate-500 text-sm">Last Name</label>
        <input
          className="border rounded-md h-10 px-2"
          type="text"
          name="last_name"
        />

        {/* Email */}
        <label className="text-slate-500 text-sm">
          Email
          {!validEmail && (
            <span className=" text-red-700 ml-3">Invalid Email</span>
          )}
        </label>
        <input
          className="border rounded-md h-10 px-2"
          type="email"
          name="email"
          onChange={(e) => validateEmail(e.target.value)}
        />

        {/* Password */}
        <label className="text-slate-500 text-sm">
          Password
          {!validPassword && (
            <span className=" text-red-700 ml-3">Password too short</span>
          )}
        </label>
        <input
          className="border rounded-md h-10 px-2"
          type="password"
          name="password"
          onChange={(e) => validatePassword(e.target.value)}
        />

        {/* Profile Picture */}
        <label className="text-slate-500 text-sm">Profile Picture</label>
        <input
          className="border rounded-md h-10 px-2"
          type="text"
          placeholder="https://..."
          name="picture"
        />

        {/* Submit button */}
        <button className="rounded-md bg-[#FB7185] text-white p-2 mt-4">
          Register
        </button>

        {error && (
          <span className=" text-center font-medium text-red-700 mb-3">
            {' '}
            {error}{' '}
          </span>
        )}

        <div className="text-xs ">
          Already have an account?{` `}
          <span className="underline text-xs text-red-500">Login here</span>
        </div>
      </form>
    </div>
  )
}

export default Signup
