import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import PrivateRoute from './components/PrivateRoute';
import PropertyAdministration from './pages/PropertyAdministration';
import ManageRooms from './pages/ManageRooms';
import BookingPage from './pages/BookingPage';
import MyReservations from './pages/MyReservations';
import AllReservations from './pages/AllReservations';
import Reports from './pages/Reports';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path='/login' element={ <LoginPage />}></Route>
          <Route path='/register' element={ <RegistrationPage />}></Route>
          <Route path='/administration' element={ <PropertyAdministration />}></Route>
          <Route path='/administration/rooms' element={ <ManageRooms />} ></Route>
          <Route path="/Booking" element={ <BookingPage /> }></Route>
          <Route path='/MyReservations' element={ <MyReservations /> }></Route>
          <Route path='/allreservations' element={ <AllReservations /> }></Route>
          <Route path='/reports' element={ <Reports /> }></Route>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App