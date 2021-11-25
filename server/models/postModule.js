const firestore = require("firebase/firestore/lite");
const firebase = require("../firebase");
const db = firestore.getFirestore(firebase);

module.exports = class Post {
  constructor(title, body, likes, comments, user) {
    (this.title = title),
      (this.body = body),
      (this.likes = likes),
      (this.comments = comments),
      (this.user = user);
  }

  static fetchAll = async () => {
    const data = firestore.collection(db, "posts");

    const postSnapShot = await firestore.getDocs(data);

    const postList = postSnapShot.docs.map((doc) => {
      return { data: doc.data(), id: doc.id };
    });

    return postList;
  };

  savePost = async () => {};
};
