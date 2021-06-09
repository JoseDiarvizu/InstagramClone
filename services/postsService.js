const sql = require("mssql");
const config = require("../config/dbconfig");

let createPost = async (userId, postImage) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("postImage", sql.NVarChar, postImage)
      .output("error", sql.Int)
      .execute("createPost");

    return results;
  } catch (err) {
    console.log(err);
  }
};

let deletePost = async (postId) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("postId", sql.Int, postId)
      .output("error", sql.Int)
      .execute("deletePost");

    return results;
  } catch (err) {
    console.log(err);
  }
};
let updatePost = async (postId,postImage) => {
    try {
      let pool = await sql.connect(config);
      let results = await pool
        .request()
        .input("postId", sql.Int, postId)
        .input("postImage",sql.NVarChar,postImage)
        .output("error", sql.Int)
        .execute("updatePost");
  
      return results;
    } catch (err) {
      console.log(err);
    }
  };

  let getFriendsPosts = async (userId) => {
    try {
      let pool = await sql.connect(config);
      let results = await pool
      .request()
      .query(`SELECT * FROM friendsPosts where followerId = ${userId} order by creation_date`);
  
      return results;
    } catch (err) {
      console.log(err);
    }
  };

  let getUserPosts = async (userId) => {
    try {
      let pool = await sql.connect(config);
      let results = await pool
      .request()
      .query(`SELECT * FROM userPosts where userid = ${userId} order by creation_date`);
      //console.log("results:",results);
      return results;
    } catch (err) {
      console.log(err);
    }
  };


module.exports = {
  createPost,
  deletePost,
  updatePost,
  getFriendsPosts,
  getUserPosts
};
