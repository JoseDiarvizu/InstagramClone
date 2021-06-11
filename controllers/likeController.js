const services = require("../services/likeServices");

module.exports = {
  createLike: async (req, res) => {
    const body = req.body;
    let data = await services.createLike(body.userId, body.postId);
    return res.redirect(`../#${body.postId}`);
  },
  deleteLike: async (req, res) => {
    const body = req.body;
    let data = await services.deleteLike(body.userId, body.postId);
    return res.redirect(`../#${body.postId}`);
  },
  getLikesCount: async (req, res) => {
    let data = await services.getLikesCount();
    return res.status(201).json({
      success: 1,
      data: data,
    });
  },
  checkLike: async (req, res) => {
    let data = await services.checkLike();
    return res.status(201).json({
      success: 1,
      data: data,
    });
  },
};
