import React, { useRef, useState, useEffect } from "react";
import useHttp from "../utils/apiHttp";
import { savePost } from "../redux/postSlice";
import { useSelector } from "react-redux";

function CreatePost({ setShow }) {
  const user = useSelector((state) => state.user.user);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { request } = useHttp();
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title && !body) {
      alert("Add Title and body");
      return;
    }
    console.log("click");
    const newPost = {
      title: title,
      body: body,
      user: user.id,
      userName: user.firstName + " " + user.lastName,
    };

    if (mounted.current) {
      request(
        {
          url: "/posts/savePost",
          method: "POST",
          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",
          },
          body: newPost,
        },
        savePost
      );
    }

    setTitle("");
    setBody("");
    setShow(false);
  };

  return (
    <form
      className="bg-white w-full md:w-4/5 border-4 border-black py-8 px-16 rounded-lg absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 font-bold"
      onSubmit={onSubmit}
    >
      <div className="flex justify-between">
        <h3 className="uppercase">Create Post</h3>
        <button
          onClick={(e) => {
            e.preventDefault();
            setShow(false);
          }}
        >
          X
        </button>
      </div>
      <hr className="my-4"></hr>
      <div className="flex flex-col mb-4">
        <label>Title </label>
        <input
          type="text"
          className="p-2"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div className="flex flex-col">
        <label>Body</label>
        <textarea
          rows="4"
          cols="50"
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-btnbg  text-black font-black my-8 py-2 px-4 rounded shadow-md"
      >
        Save post
      </button>
    </form>
  );
}

export default CreatePost;
