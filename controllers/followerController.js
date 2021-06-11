const services = require("../services/followerServices");

module.exports = {
  createFollow: async (req, res) => {
    const body = req.body;
    let data = await services.createFollow(body.followedId, body.followerId);
    res.redirect('/profile');
  },
  deleteFollow: async (req, res) => {
    const body = req.body;
    let data = await services.deleteFollow(body.followedId, body.followerId);
    res.redirect('/profile');
  },
  checkFollow: async (req, res) => {
    const body = req.body;
    let data = await services.checkFollow(body.followedId, body.followerId);
    return res.status(201).json({
      success: 1,
      data: data,
    });
  },
  getFollowers: async (req, res) => {
    const body = req.body;
    let data = await services.getFollowers(body.followedId);
    return res.status(201).json({
      success: 1,
      data: data,
    });
  },
  getFollowed: async (req, res) => {
    const body = req.body;
    let data = await services.getFollowers(body.followerId);
    return res.status(201).json({
      success: 1,
      data: data,
    });
  },
};
