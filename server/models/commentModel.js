const db = require("../firebase");
const { Timestamp, FieldValue } = require("firebase-admin/firestore");

module.exports = class User {
  constructor({ body, id, profilePic, userName, userId }) {
    (this.body = body),
      (this.userName = userName),
      (this.id = id),
      (this.profilePic = profilePic),
      (this.userId = userId);
  }

  static getCommentsByPostId = async (id) => {
    const query = await db
      .collection("comments")
      .where("post_id", "==", id)
      .get();

    let comments = [];

    if (!query.empty) {
      query.docs.forEach((comment) => {
        let time = () => {
          let stringified = comment
            .data()
            .createad_at.toDate()
            .toLocaleString("sv", { timeZoneName: "short" });
          var split1 = stringified.split("T");
          var split1 = stringified.split("CE");
          var date = split1[0].replace(/\-/g, "-");

          return date;
        };

        comments.push({
          data: comment.data(),
          id: comment.id,
          time: time(),
        });
        return comments;
      });
    } else {
      return false;
    }

    return comments;
  };

  static getAllComments = async () => {
    const snapshot = await db
      .collection("comments")
      .orderBy("createad_at", "desc")
      .get();

    let data = [];

    snapshot.forEach((doc) => {
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

      data.push({
        data: doc.data(),
        id: doc.id,
        time: time(),
      });
    });

    return data;
  };

  saveComment = async () => {
    let data = {
      body: this.body,
      username: this.userName,
      post_id: this.id,
      user_id: this.userId,
      profilePic: this.profilePic,
      createad_at: Timestamp.now(),
    };

    // Set comments
    const commentRef = db.collection("comments").doc();
    await commentRef.set(data);

    // Update post with comment id
    let commentId = await commentRef.get();
    const docRef = db.collection("posts").doc(this.id);
    await docRef.update({
      comments: FieldValue.arrayUnion(commentId.id),
    });

    return await commentRef.get((doc) => {});
  };

  static deleteComment = async (id) => {
    const res = db.collection("comments").doc(id);
    await res.delete();

    let commentId = await res.get();

    // const postRef = db.collection("posts").doc(this.id);
    // await postRef.update({
    //   comments: FieldValue.arrayRemove(commentId.id),
    // });
  };
};
