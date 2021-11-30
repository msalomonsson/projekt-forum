import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useHttp from "../utils/apiHttp";
import { storePosts } from "../redux/postSlice";

export default function Home() {
  const { loading, error, request } = useHttp();
  const posts = useSelector((state) => state.post.posts);

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
    <div>
      <h1>Home</h1>
      <ul>
        {posts &&
          posts.map((post) => {
            return <li key={post.id}>{post.data.title}</li>;
          })}
      </ul>
    </div>
  );
}
