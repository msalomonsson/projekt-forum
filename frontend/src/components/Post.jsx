import React, { useEffect, useRef, useState } from "react";
import useHttp from "../utils/apiHttp";
import { deletePost, likePost, unlikePost } from "../redux/postSlice";
import { useDispatch } from "react-redux";
import EditPost from "./EditPost";
import { useSelector } from "react-redux";
import Comments from "./Comments";

const Post = (props) => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const mounted = useRef(true);
  const [showComments, setShowComments] = useState(false);
  const user = useSelector((state) => state.user.user);
  const likes = useSelector((state) => state.post.likes);
  const [show, setShow] = useState(false);
  const [liked, setLiked] = useState(false);
  const stateComments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    mounted.current = true;
    setLiked(false);

    let id = props.data.id;
    if (user && likes) {
      likes.forEach((like) => {
        if (like.data.post_id === id && like.data.user_id === user.id) {
          setLiked(true);
        }
      });
    }

    return () => {
      mounted.current = false;
    };
  }, [props.data.data.user_id, request, likes, user, props.data.id]);

  const getCommentsById = () => {
    let comments = [];
    stateComments.filter((comment) => {
      if (comment.data.post_id === props.data.id) {
        comments.push(comment);
      }
      return null;
    });
    return comments;
  };

  const handleDelete = (e) => {
    let id = props.data.id;

    if (mounted.current) {
      request({ url: `posts/deletePost/${id}`, method: "DELETE" }, deletePost);
    }
  };

  const handleLike = (e) => {
    let id = props.data.id;

    if (mounted.current) {
      if (user) {
        request({ url: `posts/${id}/like` });

        const obj = {
          data: {
            post_id: id,
            user_id: user.id,
          },
        };

        if (
          likes.some(
            (like) => like.data.post_id === id && like.data.user_id === user.id
          )
        ) {
          dispatch(unlikePost(obj));
          setLiked(false);
        } else {
          dispatch(likePost(obj));
          setLiked(true);
        }
      }
    }
  };

  return (
    <div className="mx-auto">
      <div className="mt-8 border-2 p-5 rounded bg-primary text-left ">
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
                {props.data.data.userName ? props.data.data.userName : null}
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

            {/* Comment icon */}

            <button
              className="comment flex"
              onClick={() => {
                setShowComments(!showComments);
              }}
            >
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
              <p className="font-bold">{getCommentsById().length}</p>
            </button>

            {/* Like icon */}
            <button className="flex items-center likes" onClick={handleLike}>
              {!liked ? (
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
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              )}

              <p className="font-bold">{props.data.data.likes} likes</p>
            </button>
          </div>

          {user && user.id === props.data.data.user_id ? (
            <div className="flex gap-5">
              {/* Edit icon */}
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
              {/* Delete icon */}
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

      {showComments && <Comments props={props} />}
    </div>
  );
};

export default Post;
