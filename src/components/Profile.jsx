import { useNavigate } from 'react-router-dom'
import Nav from './Nav'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {
  //state
  const [user, setUser] = useState({})
  const [picture, setPicture] = useState(user.picture)
  const [pictureInputValue, setPictureInputValue] = useState(user.picture)
  const [changes, setChanges] = useState(false)
  const navigate = useNavigate()

  //once logged in GET the data of the profile
  const getData = async () => {
    try {
      const response = await axios.get('https://haiku-bnb.onrender.com/profile')
      if (response.data.error) {
        navigate('/')
      } else {
        setUser(response.data)
        setPicture(response.data.picture)
      }
    } catch (e) {
      alert(e.message)
    }
  }
  //update the user PATCH the new info to the API
  const updateUser = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const formObj = Object.fromEntries(form.entries())
    try {
      const { data } = await axios.patch(
        'https://haiku-bnb.onrender.com/profile',
        formObj
      )
      //show a message to the user
      if (updateUser) {
        setChanges(true)
      }
    } catch (e) {
      alert(e.message)
    }
  }
  // LOG OUT
  const logOut = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get('https://haiku-bnb.onrender.com/logout')
      console.log({ data })
      localStorage.removeItem('isLoggedIn')
      navigate('/')
    } catch (e) {
      alert(err.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handlePictureChange = (event) => {
    const newPicture = event.target.value
    setPictureInputValue(newPicture)
    setPicture(newPicture)
  }

  return (
    <div className="container mx-auto">
      <Nav />
      <div className="border-2 rounded p-4">
        <p className="text-xl mb-4 font-bold">Your Profile</p>
        <form onSubmit={updateUser}>
          <div className="flex gap-2 mb-4 items-center">
            <img
              src={picture}
              alt="Guest profile photo"
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
