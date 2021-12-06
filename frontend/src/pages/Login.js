import React from "react";
import useHttp from "../utils/apiHttp";
import ForumLogo from "../components/ForumLogo";
import GoogleLogo from "../components/GoogleLogo";

function Login() {
  const { loading, error, request } = useHttp();

  return (
    <div className="h-screen flex justify-center items-center container">
      <div className="bg-secondary w-4/12 h-4/6 flex justify-center rounded">
        <div className="flex flex-col items-center justify-between m-10 w-full">
          <div className="border-b-2 border-black w-7/12 border-opacity-25">
            <h2 className="text-xl text-center font-black">Login</h2>
          </div>
          <ForumLogo width="400" height="200" />
          <button className="border-solid border font-medium border-black w-6/12 p-2 bg-primary">
            <a
              href="/auth/google"
              className="flex items-center justify-center gap-1"
            >
              <GoogleLogo /> Log In with google
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
