import React from "react";

const Post = (props) => {
  return (
    <div className="container mx-auto">
      <div className="mt-5 border-2 p-5 rounded bg-gray-400 text-left">
        {/* Post data */}
        <div className="flex justify-between">
          <div>
            <h5>{props.data.time}</h5>
            <h1 className="text-2xl font-bold mb-5">{props.data.data.title}</h1>

            <h4>{props.data.data.body}</h4>
          </div>
          <div className="">
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-black"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-20">
          <div className="flex gap-5">
            <button>Comments</button>
            <button>Like</button>
          </div>
          <div className="flex gap-5">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
