const services = require("../services/userServices");
const postServices = require("../services/postsService");
const likeServices = require("../services/likeServices");
const commentServices = require("../services/commentService");
const followServices = require("../services/followerServices");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

module.exports = {
  login: async (req, res) => {
    const body = req.body;
    let data = await services.findUser(body.username);

    if (data.recordset[0] === undefined) {
      return res.render("login", {
        message: "no user",
      });
    }

    if (!(body.password === cryptr.decrypt(data.recordset[0].password))) {
      return res.render("login", {
        message: "Wrong password!",
      });
    }

    localStorage.setItem("userId", data.recordset[0].userId);
    localStorage.setItem("username", data.recordset[0].username);

    res.status(200).redirect("/");
  },
  logout: async (req, res) => {
    //Removing current id from localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    res.status(200).redirect("/");
  },
  isLoggedIn: async (req, res, next) => {
    //check if the user is in localstorage
    if (!(localStorage.getItem("userId") === null)) {
      try {
        let username = localStorage.getItem("username");
        let data = await services.findUser(username);
        if (data.recordset[0] === undefined) {
          return next();
        }
        req.user = data.recordset[0];
        let posts = await postServices.getUserPosts(
          localStorage.getItem("userId")
        );
        posts = posts.recordset;
        for (let i = 0; i < posts.length; i++) {
          let mypostComments = await commentServices.getPostComments(
            posts[i].postId
          );
          let myhasLike = await likeServices.checkLike(
            localStorage.getItem("userId"),
            posts[i].postId
          );

          myhasLike = myhasLike.recordset[0].hasLike;
          posts[i].myhasLike = myhasLike;

          //console.log("Post id: ", posts[i].postId);
          mypostComments = mypostComments.recordset;
          //console.log("That post comments: ", mypostComments);
          
          posts[i].comments = mypostComments;
          posts[i].likesCount = await likeServices.getLikesCount(posts[i].postId);
          posts[i].likesCount = posts[i].likesCount.recordset[0].count;
        }
        req.posts = posts;
        //console.log(posts);

        let friendsPosts = await postServices.getFriendsPosts(
          localStorage.getItem("userId")
        );
        friendsPosts = friendsPosts.recordset;
        for (let i = 0; i < friendsPosts.length; i++) {
          let postComments = await commentServices.getPostComments(
            friendsPosts[i].postId
          );
          let hasLike = await likeServices.checkLike(
            localStorage.getItem("userId"),
            friendsPosts[i].postId
          );

          hasLike = hasLike.recordset[0].hasLike;
          friendsPosts[i].hasLike = hasLike;

          //console.log("Post id: ", friendsPosts[i].postId);
          postComments = postComments.recordset;
          //console.log("That post comments: ", postComments);
          
          friendsPosts[i].comments = postComments;
          friendsPosts[i].likesCount = await likeServices.getLikesCount(friendsPosts[i].postId);
          friendsPosts[i].likesCount = friendsPosts[i].likesCount.recordset[0].count;
          
        }
        req.friendsPosts = friendsPosts;
        //console.log(req.friendsPosts);
        let userId = localStorage.getItem('userId')
        let followers = await followServices.getFollowers(userId);
        let followed = await followServices.getFollowed(userId);
        req.user = data.recordset[0];
        req.followers = followers.recordset;
        req.followed = followed.recordset;
        

        return next();
      } catch (error) {
        console.log(error);
        next();
      }
    } else {
      next();
    }
  },
};
