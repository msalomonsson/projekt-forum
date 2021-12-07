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
  }, [mounted.current]);

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

    <div className="bg-transBg w-screen h-screen absolute top-0 left-0">
      <form
        className="w-10/12 xl:w-8/12 bg-white py-8 px-16 rounded-lg absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10"
        onSubmit={onSubmit}
 >
        <div className="flex justify-between">
          <h3 className="uppercase font-bold text-lg text-background">
            New Post
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShow(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <hr className="mt-4 mb-6"></hr>
        <div className="flex flex-col mb-4">
          <label className="text-background font-medium">Title </label>
          <input
            type="text"
            required
            className="p-2 border rounded"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-background font-medium">Message</label>
          <textarea
            rows="10"
            cols="50"
            required
            placeholder="Enter a message..."
            className="border rounded p-2"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-btnbg text-background uppercase text-xs font-bold my-8 py-2 px-4 rounded shadow-md"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
