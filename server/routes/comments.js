const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

router.get("/allComments", commentsController.getAllComments);

// router.get("/:id?", commentsController.getComments);

router.post("/postComment", commentsController.postComments);

router.delete("/deleteComment/:id", commentsController.deleteComments);

module.exports = router;
