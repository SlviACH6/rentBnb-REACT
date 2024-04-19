import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Houses from './components/Houses'
import House from './components/House'
import Signup from './components/Signup'
import HouseEdit from './components/HouseEdit'
import Listings from './components/Listings'
import Login from './components/Login'
import Profile from './components/Profile'
import Bookings from './components/Bookings'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Houses />} />
                <Route path='/houses/:id' element={<House />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/houses/:id/edit' element={<HouseEdit />} />
                <Route path='/listings' element={<Listings />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/bookings' element={<Bookings />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router