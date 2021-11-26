const express = require("express");

const postsRoutes = require("./routes/posts.js");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Forum api");
});

app.use("/posts", postsRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
