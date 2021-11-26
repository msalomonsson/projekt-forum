const express = require("express");

const postsController = require("../controllers/posts.js");

const router = express.Router();

router.get("/allPost", postsController.getPosts);

router.post("/savePost", postsController.savePost);

router.get("/", (req, res) => {
  res.send("Posts Api");
});

module.exports = router;
