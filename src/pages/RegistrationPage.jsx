import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    if (!username || !email || !password) {
        alert("All fields are required!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    await axios.post('http://localhost:8080/hotel/user/register', {
      username: username,
      email: email,
      password: password
    })
      .then((response) => {
        if (response.status === 201) {
          alert("Registration Successful. Please login.");
          navigate('/login');
        } else {
          alert("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong!");
        }
      });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[url('/src/assets/registrationpage.jpg')] bg-cover bg-center">
      <div className='bg-gray-300 rounded-2xl flex flex-col p-4 px-8 gap-3'>
        <h1 className='text-center italic text-3xl font-serif mb-3'>Register</h1>
        
        <input
          type="text"
          className="bg-white p-4 rounded-2xl w-xs sm:w-md lg:w-lg"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          className="bg-white p-4 rounded-2xl w-xs sm:w-md lg:w-lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="bg-white p-4 rounded-2xl w-xs sm:w-md lg:w-lg"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-sky-900 p-4 rounded-2xl w-xs sm:w-md lg:w-lg text-white font-serif"
          onClick={handleRegister}
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-700 mt-2 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline italic cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegistrationPage;
