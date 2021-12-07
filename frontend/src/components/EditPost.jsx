import React, { useState } from "react";
import useHttp from "../utils/apiHttp";
import { editPost } from "../redux/postSlice";
import { useSelector } from "react-redux";

function EditPost({ setShow, post }) {
  const [title, setTitle] = useState(post.data.title);
  const [body, setBody] = useState(post.data.body);
  const { request } = useHttp();
  const user = useSelector((state) => state.user.user);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title && !body) {
      alert("Add Title and body");
      return;
    }
    const newPost = {
      id: post.id,
      title: title,
      body: body,
      user: user.id,
      userName: user.firstName + " " + user.lastName,
    };

    request(
      {
        url: `/posts/editPost/${post.id}`,
        method: "PATCH",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },
        body: newPost,
      },
      editPost
    );

    setTitle("");
    setBody("");
    setShow(false);
  };

  return (
    <div className="bg-transBg w-full h-screen absolute top-0 left-0">
      <form
        className="w-10/12 xl:w-8/12 bg-white py-8 px-16 rounded-lg absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10"
        onSubmit={onSubmit}
      >
        <div className="flex justify-between">
          <h3 className="uppercase font-bold text-lg text-background">
            Edit post
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
            value={title}
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
            value={body}
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
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
