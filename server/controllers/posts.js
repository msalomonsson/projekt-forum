const postModule = require("../models/postModule.js");

exports.getPosts = async (req, res) => {
  const allPosts = await postModule.fetchAll();

  res.json(allPosts);
};

exports.savePost = async (req, res) => {
  const post = new postModule(
    "my second post",
    "this is body",
    3,
    0,
    "dasd2313"
  );
};
