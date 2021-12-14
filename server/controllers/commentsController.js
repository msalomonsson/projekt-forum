const commentModel = require("../models/commentModel");

exports.getAllComments = async (req, res) => {
  const allComments = await commentModel.getAllComments();

  res.json(allComments);
};

exports.getComments = async (req, res) => {
  let id = req.params.id;

  commentModel.getCommentsByPostId(id).then((comments) => {
    res.json(comments);
  });
};

exports.postComments = async (req, res) => {
  let data = req.body;

  const comment = new commentModel(data);

  comment.saveComment().then((data) => {
    let time = () => {
      let stringified = data
        .data()
        .createad_at.toDate()
        .toLocaleString("sv", { timeZoneName: "short" });
      var split1 = stringified.split("T");
      var split1 = stringified.split("CE");
      var date = split1[0].replace(/\-/g, "-");

      return date;
    };

    let response = {
      data: data.data(),
      id: data.id,
      time: time(),
    };

    res.json(response);
  });
};

exports.deleteComments = async (req, res) => {
  let id = req.params.id;

  commentModel.deleteComment(id);

  res.json(id);
};
