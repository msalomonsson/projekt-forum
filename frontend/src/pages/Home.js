import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../utils/apiHttp";
import { storePosts } from "../redux/postSlice";

import Post from "../components/Post";

import CreatePost from "../components/CreatePost";

export default function Home() {
  const { loading, error, request } = useHttp();
  const posts = useSelector((state) => state.post.posts);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (posts) {
      return;
    }
    request({ url: "/posts/allPost" }, storePosts);
  }, [posts, request]);

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      <h1>Home</h1>

      <div className="w-11/12 mx-auto flex justify-end">
        <button
          className="bg-btnbg text-background flex items-center uppercase text-xs font-bold my-8 py-2 px-4 rounded shadow-md"
          onClick={() => setShow(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>{" "}
          <p>New post</p>
        </button>
      </div>

      {show && <CreatePost setShow={setShow} />}

      {posts != null &&
        posts.map((element) => {
          return <Post key={element.id} data={element} />;
        })}
    </div>
  );
}
