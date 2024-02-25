import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function RegisterUser() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    isEmail: true,
    password: "",
    confirmPassword: "",
  });

  const[valid, setValid] = useState(false);

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
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:5000/register", form);
      setValid(true);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
    console.log(form);
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="max-w-md p-6 rounded-md shadow-md dark:shadow-white dark:shadow-sm dark:text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-black-800 ">
          Register New Account
        </h2>

        <div className="mb-5 ">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input-field text-black w-full"
            placeholder="Enter Your Email"
            required=""
            onChange={handleChange}
          />
        </div>
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
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field text-black text-bold w-full"
            required=""
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="confirm-password"
            className="block mb-2 dark:text-white text-sm font-medium text-gray-900"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="repeat-password"
            className="input-field text-black w-full"
            name="confirmPassword"
            required=""
            onChange={handleChange}
          />
        </div>

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              defaultValue=""
              className="checkbox"
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>

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

export default RegisterUser;
