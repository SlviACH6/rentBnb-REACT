import { useNavigate } from 'react-router-dom'
import Nav from './Nav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true

function Profile() {
  //state
  const [user, setUser] = useState({})
  const [picture, setPicture] = useState('')
  const [pictureInputValue, setPictureInputValue] = useState('')
  const [changes, setChanges] = useState(false)
  const navigate = useNavigate()

  //once logged in GET the data of the profile
  const getData = async () => {
    try {
      const token = Cookies.get('jwt')
      if (!token) {
        throw new Error('JWT token not found')
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile`,
        config
      )
      setUser(response.data)
      setPicture(response.data.profile_picture)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching profile data', error.message)
    }
  }
  //update the user PATCH the new info to the API
  const updateUser = async (e) => {
    e.preventDefault()

    // Check if there are any changes in the form
    const form = new FormData(e.target)
    const formObj = Object.fromEntries(form.entries())
    const hasChanges = Object.keys(formObj).some(
      (key) => formObj[key] !== user[key]
    )

    if (!hasChanges) {
      // No changes, so no need to send the request
      return
    }

    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/profile`,
        formObj
      )

      // Handle response
      if (data) {
        setChanges(true)
        console.log('Profile updated successfully')
      }
    } catch (error) {
      console.error('Error updating profile:', error.message)
    }
  }
  // LOG OUT
  const logOut = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/logout`
      )
      console.log({ data })
      localStorage.removeItem('isLoggedIn')
      navigate('/')
    } catch (e) {
      console.error(e.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (user.profile_picture) {
      setPicture(picture)
      setPictureInputValue(picture)
    }
  }, [user])

  const handlePictureChange = (event) => {
    const newPicture = event.target.value
    console.log(event.target.value)
    setPictureInputValue(newPicture)
    setPicture(newPicture)
  }

  return (
    <div className="container mx-auto">
      <Nav profilePicture={user.profile_picture} />
      <div className="border-2 rounded p-4">
        <p className="text-xl mb-4 font-bold">Your Profile</p>
        <form onSubmit={updateUser}>
          <div className="flex gap-2 mb-4 items-center">
            <img
              src={setPicture}
              alt="User profile photo"
              className="w-20 rounded-full"
            />
            <input
              name="picture"
              type="text"
              className="border rounded h-10 font-light p-2 w-full"
              value={pictureInputValue}
              onChange={handlePictureChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-light text-slate-500">
              First Name
            </label>
            <input
              name="first_name"
              type="text"
              className="border rounded font-light mb-4 p-2 w-full"
              defaultValue={user.first_name}
              required
            />
          </div>

          <div>
            <label className="text-sm font-light text-slate-500">
              Last Name
            </label>
            <input
              name="last_name"
              type="text"
              className="border rounded font-light mb-4 p-2 w-full"
              defaultValue={user.last_name}
              required
            />
          </div>

          <div>
            <label className="text-sm font-light text-slate-500">Email</label>
            <input
              name="email"
              type="email"
              className="border rounded font-light mb-4 p-2 w-full"
              defaultValue={user.email}
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="rounded-md font-light bg-[#FB7185] text-white p-2 "
            >
              Save Changes
            </button>
            {changes ? (
              <span className=" text-center text-emerald-500">
                Your changes has been saved!
              </span>
            ) : null}
            <button
              onClick={logOut}
              type="submit"
              className="rounded-md font-light border p-2 hover:bg-slate-200 hover:border-slate-950 "
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
