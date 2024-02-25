import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RegisterUser from "./Components/RegisterUser";
import Login from "./Components/Login";
import ChatApp from './Components/ChatApp.jsx';

function App() {

  return (
    <>
    <Routes>
      <Route path="*" Component={RegisterUser} />
      <Route path="/login" Component={Login}/>
      <Route path="/chat" Component={ChatApp} />
    </Routes>
    </>
  );
}

export default App;
