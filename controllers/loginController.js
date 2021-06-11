const services = require("../services/userServices");
const followServices = require("../services/followerServices");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

module.exports = {
  login: async (req, res) => {
    const body = req.body;
    let data = await services.findUser(body.username);

    if (data.recordset[0] === undefined) {
      return res.render("login", {
        message: "Wrong user or password!",
      });
    }

    if (!(body.password === cryptr.decrypt(data.recordset[0].password))) {
      return res.render("login", {
        message: "Wrong user or password!",
      });
    }
    
    localStorage.setItem("userId", data.recordset[0].userId);
    localStorage.setItem("username", data.recordset[0].username)


    res.status(200).redirect("/");
  },
  logout: async (req, res)=>{
    //Removing current id from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    res.status(200).redirect("/");
  },
  isLoggedIn: async (req, res, next)=>{
    //check if the user is in localstorage
    if (!(localStorage.getItem("userId") === null)) {
      try {
        let username = localStorage.getItem('username')
        let userId = localStorage.getItem('userId')
        let data = await services.findUser(username);
        let followers = await followServices.getFollowers(userId);
        let followed = await followServices.getFollowed(userId);
        if(data.recordset[0] === undefined)
        {
          return next();
        }
        
        req.user = data.recordset[0];
        req.followers = followers.recordset;
        req.followed = followed.recordset;
        return next();
      } catch (error) {
        console.log(error);
        next();
      }
    }
    else{
      next();
    }
  }
};
