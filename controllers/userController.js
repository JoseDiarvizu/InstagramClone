const services = require("../services/userServices");
const followerServices = require("../services/followerServices");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const postServices = require("../services/postsService");
const commentServices = require("../services/commentService");
const likeServices = require("../services/likeServices");
module.exports = {
  createUser: async (req, res) => {
    const body = req.body;
    let hashedPassword = cryptr.encrypt(body.password);

    let data = await services.createUser({
      name: body.name,
      username: body.username,
      password: hashedPassword,
      email: body.email,
      biography: body.biography,
      phone: body.phone,
      is_public: body.is_public,
    });
    return res.render("register", {
      message: "User registered!",
    });
  },
  deleteUser: async (req, res) => {
    const body = req.body;
    let data = await services.deleteUser(body.username);
    return res.status(201).json({
      success: 1,
      data: data,
    });
  },
  updateUser: async (req, res) => {
    const body = req.body;
    let data = await services.updateUser(
      body.name,
      body.username,
      body.password,
      body.email,
      body.biography,
      body.phone,
      body.is_public
    );
    return res.status(201).json({
      success: 1,
      data: data,
    });
  },
  findUser: async (req, res) => {
    const body = req.body;
    let data = await services.findUser(body.username);
    return res.status(201).json({
      success: 1,
      data: data,
    });
  },
  showUsers: async (req, res) => {
    const body = req.body;
    try {
      console.log("Usuario: ", body);
      let data = await services.findUser(body.username);

      if (data.recordset[0] === undefined) {
        return res.render("showResults", {
          message: "no user",
          user: undefined,
        });
      }

      let userId = localStorage.getItem("userId");
      let isFollowed = await followerServices.checkFollow(
        data.recordset[0].userId,
        userId
      );

      if (
        userId == data.recordset[0].userId ||
        data.recordset[0].is_public == false
      ) {
        return res.render("showResults", {
          user: data.recordset[0],
          activeUser: userId,
          myself: true,
        });
      } else if (isFollowed.recordset[0] === undefined) {
        return res.render("showResults", {
          user: data.recordset[0],
          activeUser: userId,
        });
      } else {
        return res.render("showResults", {
          user: data.recordset[0],
          isFollowed: 1,
          activeUser: userId,
        });
      }
    } catch (error) {
      console.log(error);
      return res.render("showResults", {
        message: "no user",
      });
    }
  },
  userClicked: async (req, res) => {
    const username = req.body.user;
    let data = await services.findUser(username);
    let userId = localStorage.getItem("userId");
    if (userId == data.recordset[0].userId) {
      return res.redirect("/profile");
    }
    let posts = await postServices.getUserPosts(
      data.recordset[0].userId
    );
    posts = posts.recordset;
    for (let i = 0; i < posts.length; i++) {
      let mypostComments = await commentServices.getPostComments(
        posts[i].postId
      );
      let myhasLike = await likeServices.checkLike(
        data.recordset[0].userId,
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
    let isFollowed = await followerServices.checkFollow(
      data.recordset[0].userId,
      userId
    );
    let isFollower = await followerServices.checkFollow(
      userId,
      data.recordset[0].userId
    );
    let followers = await followerServices.getFollowers(
      data.recordset[0].userId
    );
    let followed = await followerServices.getFollowed(data.recordset[0].userId);
    if (
      isFollower.recordset[0] !== undefined &&
      isFollowed.recordset[0] === undefined
    ) {
      console.log("te siguie, pero tú no a él");
      return res.render("UserProfile", {
        user: data.recordset[0],
        activeUser: userId,
        followers: followers.recordset,
        followed: followed.recordset,
        is_public: 1,
        posts:posts
      });
    } else if (isFollowed.recordset[0] === undefined) {
      if (data.recordset[0].is_public === false) {
        console.log("No lo sigues y es privado");
        return res.render("UserProfile", {
          user: data.recordset[0],
          activeUser: userId,
        });
      } else {
        console.log("No lo sigues pero es publico");
        return res.render("UserProfile", {
          user: data.recordset[0],
          activeUser: userId,
          followers: followers.recordset,
          followed: followed.recordset,
          is_public: 1,
          posts:posts
        });
      }
    } else if (isFollowed.recordset[0] !== undefined) {
      console.log("lo sigues");
      return res.render("UserProfile", {
        user: data.recordset[0],
        isFollowed: 1,
        activeUser: userId,
        followers: followers.recordset,
        followed: followed.recordset,
        is_public: 1,
        posts:posts
      });
    }
  },
};
