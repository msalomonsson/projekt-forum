import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <h2 className="text-white text-center my-11 text-3xl font-bold ">
        PROFILE
      </h2>
      <div className="text-center pt-10">
        <img
          className="inline-block h-40 w-40 rounded-full items-center "
          src={user && user.profilePic}
          alt=""
        />
        <h1 className="text-white text-5xl tracking-wider font-light capitalize mt-5 mb-3">
          {user && user.firstName + " " + user.lastName}
        </h1>
        <h2 className="text-white text-xl ">{user && user.email}</h2>
      </div>
    </div>
  );
}
