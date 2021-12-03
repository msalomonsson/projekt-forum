const db = require("../firebase");
const { Timestamp } = require("firebase-admin/firestore");

module.exports = class Post {
  constructor({ title, body, user }) {
    (this.title = title), (this.body = body), (this.user = user);
  }

  static fetchAll = async () => {
    const snapshot = await db.collection("posts").get();

    let data = [];

    snapshot.forEach((doc) => {
      data.push({ data: doc.data(), id: doc.id });
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
  };
};
