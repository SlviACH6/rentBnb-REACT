import { Link } from 'react-router-dom'

function Nav({ profilePicture }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  console.log(isLoggedIn)

  return (
    <nav className=" flex justify-between items-center p-4">
      {/*NAV left logo*/}
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dsko6ntfj/image/upload/v1642399114/portal/web%20development%20beginners/05%20Project%20Airbnb/assets/logo-airbnb.png
              "
          alt="Airbnb logo"
          className="h-6 w-20 "
        />
      </Link>
      {/*NAV right*/}
      <div className="flex items-center ">
        {!isLoggedIn ? (
          <>
            <Link
              className="border rounded px-2 py-2 hover:border-rose-500 mr-4"
              href="login.html"
              to={'/login'}
            >
              LogIn
            </Link>
            <Link
              className="border rounded px-2 py-2 hover:border-rose-500 mr-2"
              href="signup.html"
              to={'/signup'}
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/bookings"
              className="flex gap-4 items-center mr-2  p-2 border-2 border-gray-300 rounded-lg  hover:border-red-400 text-sm "
            >
              My bookings
            </Link>

            <Link
              to="/listings"
              className="flex gap-4 items-center mr-2 p-2 border-2 border-gray-300 rounded-lg  hover:border-red-400 text-sm "
            >
              My listing
            </Link>

            <Link
              to={'/profile'}
              href="profile.html"
              className="flex gap-4 items-center p-1 border-2 border-gray-300 rounded-lg  hover:border-red-400 text-sm "
            >
              <img
                src={profilePicture}
                alt="host profile photo"
                className=" w-7 h-7 rounded-full"
              />
              My profile
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
export default Nav
