import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useHttp from "../utils/apiHttp";

function Login() {
  const { loading, error, request } = useHttp();
  let navigate = useNavigate();

  return (
    <div>
      <button>
        <a href="/auth/google">Log In with google</a>
      </button>
    </div>
  );
}

export default Login;
