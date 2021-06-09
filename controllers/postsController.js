const services = require("../services/postsService");

module.exports = {
  createPost: async (req, res) => {
    const body = req.body;
    let data = await services.createPost(body.userId, body.postImage);
    return res.status(201).json({
      success: 1,
      data: data
    });
  },
  deletePost: async (req, res) => {
    const body = req.body;
    let data = await services.deletePost(body.postId);
    return res.status(201).json({
      success: 1,
      data: data
    });
  },

  updatePost: async (req, res) => {
    const body = req.body;
    let data = await services.updatePost(body.postId,body.postImage);
    return res.status(201).json({
      success: 1,
      data: data
    });
  },
  getFriendsPosts: async (req, res) => {
    const body = req.body;
    let data = await services.getFriendsPosts(body.userId);
    return res.status(201).json({
      success: 1,
      data: data
    });
  },
  getUserPosts: async (req, res) => {
    const body = req.body;
    let data = await services.getUserPosts(body.userId);
    return res.status(201).json({
      success: 1,
      data: data
    });
  },
};