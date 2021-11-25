const express = require("express");
const firestore = require("firebase/firestore/lite");

const postsRoutes = require("./routes/posts.js");

const PORT = process.env.PORT || 3001;

const app = express();

const firebase = require("./firebase");
const db = firestore.getFirestore(firebase);

app.get("/", (req, res) => {
  res.send("Forum api");
});

app.use("/posts", postsRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
