const postModule = require("../models/postModule.js");

exports.getPosts = async (req, res) => {
  const allPosts = await postModule.fetchAll();

  res.json(allPosts);
};

exports.savePost = async (req, res) => {
  let data = req.body;

  console.log(data);

  const post = new postModule(data);

  console.log(post);

  post.savePost();

  res.send("post was succes");
};
