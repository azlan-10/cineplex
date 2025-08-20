import React, { useState } from 'react';
import Topbar from '../assets/Components/Topbar';
import Input from '../assets/Components/Input';
import Button from '../assets/Components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.API}/auth/login`, {
        email,
        password
      });

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        alert("Login successful");
        navigate('/search');
      }
    } catch (error) {
      console.log("Login error:", error);

      if (error.response && error.response.status === 401) {
        alert("Incorrect Input / User doesn't exist, please sign up.");
        navigate('/signup');
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-10">
  <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
    <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center p-2 border-b-2 mb-4">Sign In</h2>

    <Input 
      onChange={(e) => setEmail(e.target.value)}
      label={"Email"} 
      placeholder={"john@gmail.com"} 
    />

    <Input 
      onChange={(e) => setPassword(e.target.value)}
      label={"Password"} 
      placeholder={"Enter your password"} 
    />

    <Button onClick={handleLogin} label={"Login"} />
  </div>
</div>

  );
}

export default Signin;
