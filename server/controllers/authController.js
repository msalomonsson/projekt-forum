const userModel = require("../models/userModel.js");

exports.success = (req, res, next) => {
  res.json({ data: req.user });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
};

exports.findUserByID = (req, res) => {
  let id = req.params.id;

  userModel.findById(id).then((data) => {
    res.json(data);
  });
};
