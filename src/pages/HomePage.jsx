import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar';
import HomeContent from './HomeContent';

const Home = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('user'));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className='container h-screen mx-auto p-1 scrollbar-hide'>
      <Navbar toggleMenu={toggleMenu}/>
      <HomeContent />
      {isMenuOpen && <Sidebar toggleMenu={toggleMenu} username={currentUser.username}/>} 
    </div>
  )
}

export default Home