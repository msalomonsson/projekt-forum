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
  const [search, setSearch] = useState("");

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
    <div className="container mx-auto ">
      <h1>Home</h1>


      
       

      <div className="flex justify-between items-center ">
        {/* Seach */}
        <label className="w-full mr-5 relative">
          <input
            type="search"
            className="border-2 border-gray-300 bg-white h-10  rounded-lg text-sm focus:outline-none  w-full"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 pointer-events-none  absolute top-1/2 transform -translate-y-1/2 right-3  text-btnbg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </label>

        {/* Create button */}
        {
          <div>
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
        }

      </div>

      {show && <CreatePost setShow={setShow} />}

      {posts != null &&
        posts
          .filter((post) => {
            if (search === "") {
              return post;
            } else if (
              post.data.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return post;
            }
          })
          .map((post, i) => {
            return <Post key={i} data={post} />;
          })}

    </div>
  );
}
