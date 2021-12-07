const express = require("express");
const passport = require("passport");

const authControllers = require("../controllers/authController");

const router = express.Router();

const isLoggedInMiddleWare = (req, res, next) => {
  req.user ? next() : res.end();
};

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/auth/failure",
  })
);

router.get("/success", isLoggedInMiddleWare, authControllers.success);

router.get("/logout", authControllers.logout);

router.get("/findUser/:id", authControllers.findUserByID);

module.exports = router;
