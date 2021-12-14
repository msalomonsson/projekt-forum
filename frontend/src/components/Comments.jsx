import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deleteCommentState, updateCommentState } from "../redux/commentSlice";
import useHttp from "../utils/apiHttp";

const Comments = ({ props }) => {
  const { request } = useHttp();
  // const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const user = useSelector((state) => state.user.user);
  const stateComments = useSelector((state) => state.comments.comments);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    let comment = {
      body: body,
      userId: user.id,
      userName: user.firstName + " " + user.lastName,
      profilePic: user.profilePic,
      id: props.data.id,
    };

    request(
      {
        url: "/comments/postComment",
        method: "POST",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },
        body: comment,
      },
      updateCommentState
    );

    e.target.reset();
  };

  const handleDelete = (e) => {
    let id =
      e.target.parentElement.parentNode.parentElement.getAttribute("data-key");

    if (id != null) {
      request(
        { url: `comments/deleteComment/${id}`, method: "DELETE" },
        deleteCommentState
      );
    }
  };

  return (
    <div className="mb-20">
      {/* Comment Form */}
      {user && (
        <form onSubmit={handleSubmit} className="my-5">
          <input
            type="text"
            placeholder="Write Comment"
            className="w-full p-5 rounded"
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="flex justify-end mt-5">
            <button className="bg-btnbg text-black py-2 px-4 rounded inline-flex items-center">
              Post Comment
            </button>
          </div>
        </form>
      )}

      {/* Comments list */}
      <div>
        <h1 className="text-2xl font-bold text-white my-5">All comments</h1>
        <ul className="bg-white p-5 rounded">
          {stateComments &&
            getCommentsById().map((comment) => {
              return (
                <li data-key={comment.id} key={comment.id} className=" ">
                  <div className="flex items-center gap-5">
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-black"
                      src={comment.data.profilePic}
                      alt=""
                    />
                    <h1 className="font-semibold">{comment.data.username}</h1>
                    <h1>{comment.time}</h1>
                  </div>
                  <div className=" p-5 flex justify-between">
                    <h1>{comment.data.body}</h1>
                    {user && user.id === comment.data.user_id ? (
                      <button onClick={handleDelete}>
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    ) : null}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Comments;
