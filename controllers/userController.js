const services = require("../services/userServices");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
module.exports = {
  createUser: async (req, res) => {
    const body = req.body;
    let hashedPassword = cryptr.encrypt(body.password);
    console.log(hashedPassword);
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
};
