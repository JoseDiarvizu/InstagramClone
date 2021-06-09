const services = require("../services/followerServices");

module.exports = {
  createFollow: async (req, res) => {
    const body = req.body;
    let data = await services.createFollow(body.followedId, body.followerId);
    return res.status(201).json({
      success: 1,
      data: data,
    });
  },
  deleteFollow: async (req, res) => {
    const body = req.body;
    let data = await services.deleteFollow(body.followedId, body.followerId);
    return res.status(201).json({
      success: 1,
      data: data,
    });
  },
  checkFollow: async (req, res) => {
    const body = req.body;
    let data = await services.checkFollow(body.followedId, body.followerId);
    return res.status(201).json({
      success: 1,
      data: data,
    });
  },
};
