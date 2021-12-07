const db = require("../firebase");

module.exports = class User {
  constructor(lastName, firstName, email, id, profilePic) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.email = email;
    this.id = id;
    this.profilePic = profilePic;
  }

  saveUser = async () => {
    const data = {
      lastName: this.lastName,
      firstName: this.firstName,
      email: this.email,
      id: this.id,
      posts: [],
      profilePic: this.profilePic,
    };

    const docRef = db.collection("users").doc();

    await docRef.set(data);
  };

  static getUserByEmail = async (email) => {
    const query = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!query.empty) {
      const user = query.docs[0];
      const userData = user.data();
      return userData;
    } else {
      return false;
    }
  };

  static findById = async (id) => {
    const query = await db.collection("users").where("id", "==", id).get();

    if (!query.empty) {
      const user = query.docs[0];
      const userData = user.data();
      return userData;
    } else {
      return false;
    }
  };
};
