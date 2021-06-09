const sql = require("mssql");
const config = require("../config/dbconfig");
let checkFollow = async (followedId, followerId) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .query(
        `SELECT * FROM VFollowers where followed_userId=${followedId} and followerId=${followerId}`
      );
    return results;
  } catch (err) {
    console.log(err);
  }
};

let createFollow = async (followedId, followerId) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("followerUserId", sql.Int, followerId)
      .input("followedUserId", sql.Int, followedId)
      .output("error", sql.Int)
      .execute("AddFollow");

    return results;
  } catch (err) {
    console.log(err);
  }
};

let deleteFollow = async (followedId, followerId) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("followerUserId", sql.Int, followerId)
      .input("followedUserId", sql.Int, followedId)
      .output("error", sql.Int)
      .execute("DeleteFollow");

    return results;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  createFollow,
  deleteFollow,
  checkFollow,
};
