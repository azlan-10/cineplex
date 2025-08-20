import React, { useState } from 'react';
import Topbar from '../assets/Components/Topbar';
import Input from '../assets/Components/Input';
import Button from '../assets/Components/Button';
import Bottomline from '../assets/Components/Bottomline';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [firstname, SetFirstname] = useState("");
  const [lastname, SetLastname] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${process.env.API}/auth/signup`, {
        email,
        firstname,
        lastname,
        password
      });
      localStorage.setItem("token", response.data.token);
      navigate("/search?name=" + firstname);
    } catch (err) {
      console.log("Signup failed", err);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-10">
      <Topbar />
      <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center p-2 border-b-2 mb-4">Sign Up</h2>

        <Input onChange={(e) => SetFirstname(e.target.value)} label={"First Name"} placeholder={"John"} />
        <Input onChange={(e) => SetLastname(e.target.value)} label={"Last Name"} placeholder={"Doe"} />
        <Input onChange={(e) => SetEmail(e.target.value)} label={"Email"} placeholder={"john@example.com"} />
        <Input onChange={(e) => SetPassword(e.target.value)} label={"Password"} placeholder={"Enter password"} />

        <Button onClick={handleSignup} label={"Sign Up"} />
        <Bottomline label={"Already Signed Up?"} btntext={"Login"} to={'/signin'} />
      </div>
    </div>
  );
}

export default Signup;
