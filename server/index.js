const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {
  res.send("Forum api");
});

app.get("/api", (req, res) => {
<<<<<<< HEAD
  res.json({ message: "Hello from Max!" });
=======
  res.json({ message: "Hello from Elin!" });
>>>>>>> c3750feb14bfd79122aab126ff0f9a0dec7b6a92
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
