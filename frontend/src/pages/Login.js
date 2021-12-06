import React from "react";
import { Link } from "react-router-dom";
import useHttp from "../utils/apiHttp";

function Login() {
  const { loading, error, request } = useHttp();

  return (
    <div>
      <div className="sm:container flex justify-center content-center">
        <a href="/auth/google">Log In with google</a>
      </div>
    </div>
  );
}

export default Login;
