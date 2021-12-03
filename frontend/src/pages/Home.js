import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useHttp from "../utils/apiHttp";
import { storePosts } from "../redux/postSlice";
import Post from "../components/Post";

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
    <div className="">
      <h1>Home</h1>
      {posts != null &&
        posts.map((element) => {
          return <Post key={element.id} data={element} />;
        })}
    </div>
  );
}
