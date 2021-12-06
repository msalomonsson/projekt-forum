exports.success = (req, res, next) => {
  res.json({ data: req.user });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
};
