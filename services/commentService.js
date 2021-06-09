const sql = require("mssql");
const config = require("../config/dbconfig");

let createComment = async (userId, postId, content) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("postId", sql.Int, postId)
      .input("content", sql.NVarChar, content)
      .output("error", sql.Int)
      .execute("createComment");

    return results;
  } catch (err) {
    console.log(err);
  }
};

let deleteComment = async (commentId) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("commentId", sql.Int, postId)
      .output("error", sql.Int)
      .execute("deleteComment");
    return results;
  } catch (err) {
    console.log(err);
  }
};
let updateComment = async (commentId, content) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("commentId", sql.Int, commentId)
      .input("content", sql.NVarChar, content)
      .output("error", sql.Int)
      .execute("updateComment");

    return results;
  } catch (err) {
    console.log(err);
  }
};
let getPostComments = async (postId) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .query(`SELECT * FROM VComments WHERE postId=${postId}`);

    return results;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createComment,
  deleteComment,
  updateComment,
  getPostComments
};
