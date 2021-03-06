import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import useHttp from "../utils/apiHttp";
import { storePosts, setLikes } from "../redux/postSlice";

import Post from "../components/Post";

import CreatePost from "../components/CreatePost";

import { storeComments } from "../redux/commentSlice";

import Filter from "../components/Filter";

export default function Home() {
  const { loading, error, request } = useHttp();
  const posts = useSelector((state) => state.post.posts);
  const likes = useSelector((state) => state.post.likes);
  const user = useSelector((state) => state.user.user);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [filterOption, setFilterOption] = useState("1");

  useEffect(() => {
    if (posts) {
      return;
    }
    if (likes) {
      return;
    }
    request({ url: "/posts/likes" }, setLikes);
    request({ url: "/posts/allPost" }, storePosts);
    request({ url: "/comments/allComments" }, storeComments);
  }, [likes, posts, request]);

  const handleFilterValue = (filterVal) => {
    setFilterOption(filterVal);
  };

  const handleFilterList = (arr) => {
    let filteredArray;
    switch (filterOption) {
      case "1":
        filteredArray = [...arr].sort(
          (a, b) => moment(b.time) - moment(a.time)
        );
        return filteredArray;
      case "2":
        filteredArray = [...arr].sort(
          (a, b) => moment(a.time) - moment(b.time)
        );
        return filteredArray;

      case "3":
        if ([...arr].every((el) => el.data.likes === 0)) {
          return [...arr];
        }
        filteredArray = [...arr].sort((a, b) => b.data.likes - a.data.likes);

        return filteredArray;
      default:
        break;
    }
  };

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto h-full pb-24 mt-8">
      <div className="flex justify-between items-center">
        {/* Seach */}
        <label className="w-full relative">
          <input
            type="search"
            className="border-2 border-gray-300 bg-white h-8 rounded p-4 text-base focus:outline-none w-full"
            placeholder="Search..."
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
        {user && (
          <div className="ml-8">
            <button
              className="bg-btnbg text-background flex items-center uppercase text-xs font-bold my-8 py-2 px-4 rounded shadow-md w-28 "
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
        )}
      </div>

      <Filter filterValue={handleFilterValue} />

      {/* Posts */}

      {show && <CreatePost setShow={setShow} />}
      {posts &&
        handleFilterList(posts)
          .filter((post) => {
            if (search === "") {
              return post;
            } else if (
              post.data.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return post;
            }
            return null;
          })
          .map((post, i) => {
            return <Post key={i} data={post} />;
          })}
    </div>
  );
}
