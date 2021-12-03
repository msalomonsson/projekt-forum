require("dotenv").config({ path: "./.env" });
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const { SESSION_SECRET } = require("./keys");

require("./auth");

const postsRoutes = require("./routes/posts.js");
const authRoutes = require("./routes/auth.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/posts", postsRoutes);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Forum api");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
