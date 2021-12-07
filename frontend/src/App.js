import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import useHttp from "./utils/apiHttp";
import { storeUser } from "./redux/userSlice";
import { useSelector } from "react-redux";

function App() {
  const { request } = useHttp();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      return;
    } else {
      request({ url: "/auth/success" }, storeUser);
    }
  }, [request, user]);

  return (
    <div className="App bg-background min-h-screen">
      <div className="">
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
