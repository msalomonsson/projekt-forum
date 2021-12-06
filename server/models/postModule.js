const db = require("../firebase");
const { Timestamp } = require("firebase-admin/firestore");
const { post } = require("../routes/posts");

module.exports = class Post {
  constructor(data) {
    this.title = data.title;
    this.body = data.body;
    this.user = data.user;
    this.id = data.id;
  }

  static fetchAll = async () => {
    const snapshot = await db.collection("posts").get();

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

  savePost = async () => {
    let data = {
      title: this.title,
      body: this.body,
      user_id: this.user,
      likes: 0,
      comments: null,
      createad_at: Timestamp.now(),
    };

    const docRef = db.collection("posts").doc();

    await docRef.set(data);

    return await docRef.get((doc) => {});
  };

  static deletePost = async (id) => {
    console.log(id);

    const res = db.collection("posts").doc(id);

    await res.delete();
  };

  editPost = async () => {
    let data = {
      title: this.title,
      body: this.body,
    };
    const postDoc = db.collection("posts").doc(this.id);
    await postDoc.update(data);
    return await postDoc.get((doc) => {});
  };
};
