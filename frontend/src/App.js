import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import useHttp from "./utils/apiHttp";
import { useSelector } from "react-redux";
import { storeUser } from "./redux/userSlice";

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
  //test hej
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
