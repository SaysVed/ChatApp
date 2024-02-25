import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    isEmail: true,
    password: "",
  });

  const[valid, setValid] = useState(true);

  const handleChange = (e) => {
    var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "email") {
      const isValidEmail = validRegex.test(e.target.value);
      setForm((prevForm) => ({
        ...prevForm,
        isEmail: isValidEmail,
      }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log(form);
    console.log("trying to login!");
    const response = await axios.post("http://localhost:5000/login", form);
    if (response) {
      console.log(response);
      if (response.status === 200) {
        setValid(true);
        navigate('/chat');
      } else if (response.status === 401) {
        setValid(false);
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      setValid(false);
    } else {
      console.error(error);
    }
  }
  console.log(form);
};

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="max-w-md p-6 rounded-md shadow-md dark:shadow-white dark:shadow-sm dark:text-white"
      >
        <h2 className="text-2xl w-64 font-bold mb-6 text-black-800 ">
          User Login
        </h2>


        <div className="mb-5 ">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field text-black w-full"
            placeholder="Enter Your Email"
            required=""
            onChange={handleChange}
          />
        </div>
        <span
          className="text-red-500 mb-4"
          style={{ display: form.isEmail ? "none" : "block" }}
        >
          Enter a valid email
        </span>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 dark:text-white text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field text-black text-bold w-full"
            required=""
            placeholder="Enter Your Password"
            onChange={handleChange}
          />
        </div>
        <span className="text-red-500 mb-4" 
          style={{ display: valid ? "none" : "block" }}
        >Invalid Username or Password</span>

        <button
          type="submit"
          className="btn-primary dark:text-white dark:bg-blue-700 w-full dark:hover:bg-blue-900"
        >
          Register new account
        </button>
      </form>
    </div>
  );
}

export default Login;
