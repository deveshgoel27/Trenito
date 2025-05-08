import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Doctors from './Pages/Doctors'
import Login from './Pages/Login'
import Contact from './Pages/Contact'
import MyProfile from './Pages/MyProfile'
import Appointment from './Pages/Appointment'
import MyAppointment from './Pages/MyAppointment'
import NavBar from './component/NavBar'
import Footer from './component/Footer'
const App = () => {
  return(
    <div className='mx-4 sm:mx-[10%]'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/myprofile' element={<MyProfile/>} />
        <Route path='/appointment/:docId' element={<Appointment/>} />
        <Route path='/myappointment' element={<MyAppointment/>} />
      </Routes>
      <Footer/>
    </div>
  )
}
export default App;
