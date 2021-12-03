const postModule = require("../models/postModule.js");

exports.getPosts = async (req, res) => {
  const allPosts = await postModule.fetchAll();

  res.json(allPosts);
};

exports.savePost = async (req, res) => {
  let data = req.body;

  const post = new postModule(data);

  post.savePost().then((data) => {
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

exports.deletePost = async (req, res) => {
  let id = req.params.id;

  postModule.deletePost(id);

  res.json(id);

  // res.send(`Deleted post with id: ${id}`);
};
