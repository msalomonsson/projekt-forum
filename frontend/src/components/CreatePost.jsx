import React, { useState } from "react";
import useHttp from "../utils/apiHttp";
import { savePost } from "../redux/postSlice";

function CreatePost({ setShow }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { request } = useHttp();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title && !body) {
      alert("Add Title and body");
      return;
    }
    console.log("click");
    const newPost = { title: title, body: body, user: "jdhaja726gh" };

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

    setTitle("");
    setBody("");
    setShow(false);
  };

  return (
    <form
      className="bg-gray-300 py-8 px-16 rounded-lg absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
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
        className="bg-green-700 text-white my-8 py-2 px-4 rounded shadow-md"
      >
        Save post
      </button>
    </form>
  );
}

export default CreatePost;
