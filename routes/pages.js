const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/", loginController.isLoggedIn, (req, res) => {
  res.render("index", {
    user: req.user,
    friendsPosts: req.friendsPosts,
  });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/uploadimage", loginController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("uploadImage")
  } else {
    res.redirect("/login");
  }
});

router.get("/profile", loginController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("profile", {
      user: req.user,
      posts: req.posts,
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
