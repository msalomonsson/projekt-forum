import React, { useEffect, useRef, useState } from "react";
import useHttp from "../utils/apiHttp";
import { deletePost } from "../redux/postSlice";
import EditPost from "./EditPost";
import { useSelector } from "react-redux";

const Post = (props) => {
  const { request } = useHttp();
  const mounted = useRef(true);
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [name, setName] = useState("");
  const [likes, setLikes] = useState(props.data.data.likes);

  useEffect(() => {
    mounted.current = true;

    request({ url: `/auth/findUser/${props.data.data.user_id}` }, setName);

    return () => {
      mounted.current = false;
    };
  }, [props.data.data.user_id, request]);

  const handleDelete = (e) => {
    let id = props.data.id;

    if (mounted.current) {
      request({ url: `posts/deletePost/${id}`, method: "DELETE" }, deletePost);
    }
  };

  const handleLike = (e) => {
    setLikes(likes + 1);
  };

  return (
    <div className=" mx-auto ">
      <div className="mt-5 border-2 p-5 rounded bg-primary text-left ">
        {/* Post data */}
        <div className="flex gap-5 ">
          <div className="">
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-black"
              src={props.data.data.profilePic}
              alt=""
            />
          </div>
          <div>
            <div className="flex gap-5 ">
              <h2>
                {props.data.data.userName
                  ? props.data.data.userName
                  : name && name.firstName + " " + name.lastName}
              </h2>
              <h5>{props.data.time}</h5>
            </div>
            <h1 className="text-2xl font-black my-5">
              {props.data.data.title}
            </h1>

            <h4>{props.data.data.body}</h4>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-20">
          <div className="flex gap-5">
            {show && <EditPost setShow={setShow} post={props.data} />}

            <button className="comment">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
            <button className="flex likes" onClick={handleLike}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-red-500 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <p className="font-bold">{likes}</p>
            </button>
          </div>
          {user && user.id === props.data.data.user_id ? (
            <div className="flex gap-5">
              <button onClick={() => setShow(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:text-btnbg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button onClick={handleDelete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Post;
