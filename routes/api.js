const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const userController = require("../controllers/userController");
const followerController = require("../controllers/followerController");
const postsController = require("../controllers/postsController");
const commentController = require("../controllers/commentController");
const loginController = require("../controllers/loginController");
const uploadController = require("../controllers/uploadImageController");
const feedController = require("../controllers/feedController");
///////////////////////////////////////////////////////////////////////////////////////
router.get("/", (req, res) => {
  res.send("Hello, world!");
});
router.post("/login", (req, res) => {
  loginController.login(req, res);
});
router.get("/login", (req, res) => {
  loginController.logout(req,res);
});
//////////////////////////////////////////////////////////////////////////////////////
router.post("/uploadimage",(req, res)=>{
  uploadController.uploadImage(req, res);
});
router.get("/feed",(req,res)=>{
  feedController.showFeed(req,res);
});
//////////////////////////////////////////
router.post("/like", (req, res) => {
  req.body.userId = parseInt(localStorage.getItem("userId"));
  likeController.createLike(req, res);
  //console.log("USER ID: ",req.body.userId);
  //res.redirect("../");
});

router.post("/deletelike", (req, res) => {
  //console.log("delete that like!");
  req.body.userId = parseInt(localStorage.getItem("userId"));
  likeController.deleteLike(req, res);
});

router.get("/like", (req, res) => {
  likeController.getLikesCount(req, res);
});
//////////////////////////////////////////
router.post("/user", (req, res) => {
  userController.createUser(req, res);
});
router.get("/user", (req, res) => {
  userController.findUser(req, res);
});
router.put("/user", (req, res) => {
  userController.updateUser(req, res);
});
router.delete("/user", (req, res) => {
  userController.deleteUser(req, res);
});
//////////////////////////////////////////
router.post("/follow", (req, res) => {
  followerController.createFollow(req, res);
});
router.delete("/follow", (req, res) => {
  followerController.deleteFollow(req, res);
});
router.get("/follow", (req, res) => {
  followerController.checkFollow(req, res);
});

///////////////////////////////////////////////

router.post("/posts", (req, res) => {
  postsController.createPost(req, res);
});

router.delete("/posts", (req, res) => {
  postsController.deletePost(req, res);
});

router.put("/posts", (req, res) => {
  postsController.updatePost(req, res);
});
router.get("/friendsposts", (req, res) => {
  postsController.getFriendsPosts(req, res);
});
router.get("/userposts", (req, res) => {
  postsController.getUserPosts(req, res);
});

///////////////////////////////////////////////

router.post("/comments", (req, res) => {
  //console.log("COMMENTS");
  //console.log("REQ BODY",req.body);
  commentController.createComment(req, res);
  //res.redirect("../");
});

router.delete("/comments", (req, res) => {
  commentController.deleteComment(req, res);
});

router.put("/comments", (req, res) => {
  commentController.updateComment(req, res);
});

////////////////////////////////////////////////

module.exports = router;
