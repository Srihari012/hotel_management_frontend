import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate();

  const [username,setUsername]= useState("");
  const [Password,setPassword]= useState("");

  const handleLogin = async() => {
    axios.post('http://localhost:8080/hotel/user/login', {
      username: username,
      password: Password
    })
    .then(response => {
      if (response.status === 200) {
        const res = response.data;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(res));
        navigate('/home');
      } else {
        alert("Login failed. Please check your credentials.");
      }
    })
    .catch(error => {
      console.error("There was an error!", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    });
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[url('/src/assets/loginpage.jpg')] bg-cover bg-center">
      <div className="bg-gray-300 rounded-2xl flex flex-col p-4 px-8 gap-3"> 
        <h1 className="text-center italic text-3xl font-serif mb-3">Sign In</h1>

        <input 
          type="text" 
          className="bg-white p-4 rounded-2xl w-xs sm:w-md lg:w-lg" 
          placeholder="Username" 
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
        <input 
          type="password" 
          className="bg-white p-4 rounded-2xl w-xs sm:w-md lg:w-lg" 
          placeholder="Password" 
          value={Password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button 
          className="bg-sky-900 p-4 rounded-2xl w-xs sm:w-md lg:w-lg text-white font-serif"
          onClick={handleLogin}
          >
          Log In
        </button>

        <p className="text-sm text-gray-700 mt-2 text-center">
          Don’t have an account?{" "}
          <span 
            className="text-blue-600 hover:underline italic cursor-pointer" 
            onClick={() => navigate('/register')}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
