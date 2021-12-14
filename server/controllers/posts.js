const postModule = require("../models/postModule.js");
const db = require("../firebase");

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

exports.editPost = async (req, res) => {
  let data = req.body;
  const post = new postModule(data);
  post.editPost().then((doc) => {
    let time = () => {
      let stringified = doc
        .data()
        .createad_at.toDate()
        .toLocaleString("sv", { timeZoneName: "short" });
      var split1 = stringified.split("T");
      var split1 = stringified.split("CE");
      var date = split1[0].replace(/\-/g, "-");

      return date;
    };

    let post = {
      data: doc.data(),
      id: doc.id,
      time: time(),
    };

    res.json(post);
  });
};

exports.deletePost = async (req, res) => {
  let id = req.params.id;

  postModule.deletePost(id);

  res.json(id);

  // res.send(`Deleted post with id: ${id}`);
};

exports.likes = async (req, res) => {
  const snapshot = await db.collection("likes").get();

  let data = [];

  snapshot.forEach((doc) => {
    data.push({
      data: doc.data(),
    });
  });
  res.send(data);
  return data;
};

exports.likePost = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("user_id", "==", req.user.id)
    .where("post_id", "==", req.params.id)
    .limit(1);

  const postDocument = db.collection("posts").doc(req.params.id);

  let postData;

  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.post_id = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            post_id: req.params.id,
            user_id: req.user.id,
          })
          .then(() => {
            postData.likes++;
            return postDocument.update({ likes: postData.likes });
          })
          .then(() => {
            return res.json(postData);
          });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            postData.likes--;
            return postDocument.update({ likes: postData.likes });
          })
          .then(() => {
            res.json(postData);
          });

        /* return res.status(400).json({ error: "Scream already liked" }); */
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.unlikePost = (req, res) => {
  const likeDocument = db
    .collection("likes")
    /* .where("user_id", "==", req.user) */
    .where("post_id", "==", req.params.id)
    .limit(1);

  const postDocument = db.doc(`/posts/${req.params.id}`);

  let postData;

  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.post_id = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Scream not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            postData.likes--;
            return postDocument.update({ likes: postData.likes });
          })
          .then(() => {
            res.json(postData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
