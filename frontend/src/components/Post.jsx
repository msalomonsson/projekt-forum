import React, { useEffect, useRef, useState } from "react";
import useHttp from "../utils/apiHttp";
import { deletePost, savePost } from "../redux/postSlice";
import { useSelector } from "react-redux";

const Post = (props) => {
  const { request } = useHttp();
  const mounted = useRef(true);
  const user = useSelector((state) => state.user.user);
  const [name, setName] = useState("");

  useEffect(() => {
    mounted.current = true;

    request({ url: `/auth/findUser/${props.data.data.user_id}` }, setName);

    return () => {
      mounted.current = false;
    };
  }, [props.data.data.user_id, request]);

  const handleClick = (e) => {
    let id = props.data.id;

    if (mounted.current) {
      request({ url: `posts/deletePost/${id}`, method: "DELETE" }, deletePost);
    }
  };

  const handlePost = (e) => {
    if (mounted.current) {
      request(
        {
          url: `posts/savePost`,
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: { title: "Test", body: "Test body", user: "asdasd21412412421" },
        },
        savePost
      );
    }
  };

  return (
    <div className="container mx-auto ">
      <div className="mt-5 border-2 p-5 rounded bg-primary text-left ">
        {/* Post data */}
        <div className="flex gap-5">
          <div className="">
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-black"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div>
            <div className="flex gap-5 ">
              <h2>{name && name.firstName + " " + name.lastName}</h2>
              <h5>{props.data.time}</h5>
            </div>
            <h1 className="text-2xl font-bold my-5">{props.data.data.title}</h1>

            <h4>{props.data.data.body}</h4>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-20">
          <div className="flex gap-5">
            <button>Comments</button>
            <button>Like</button>
          </div>
          {user && user.id === props.data.data.user_id ? (
            <div className="flex gap-5">
              <button onClick={handlePost}>Edit</button>
              <button onClick={handleClick}>Delete</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Post;
