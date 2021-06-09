const sql = require("mssql");
const config = require("../config/dbconfig");

let createLike = async (userId, postId) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("postId", sql.Int, postId)
      .output("error", sql.Int)
      .execute("AddLike");

    //console.dir(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};
let deleteLike = async (userId, postId) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("postId", sql.Int, postId)
      .output("error", sql.Int)
      .execute("DeleteLike");

    //console.dir(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};
let getLikesCount = async (postId) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .query(`SELECT COUNT(postId) as count from VLikes where postId=${postId}`);
    
    //console.dir(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};
let checkLike = async (userId, postId) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .query(`SELECT COUNT(likeId) as hasLike from Likes where userId=${userId} and postId=${postId}`);
    
    //console.dir(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  createLike,
  deleteLike,
  getLikesCount,
  checkLike
};
