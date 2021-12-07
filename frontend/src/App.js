import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

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
    <div className="App bg-background min-h-screen ">
      <div className="container mx-auto">
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </div>
      </div>


 
}

export default App;
