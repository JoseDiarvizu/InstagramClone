const sql = require("mssql");
const config = require("../config/dbconfig");

let createUser = async (
  {
  name:name,
  username:username,
  password:password,
  email:email,
  biography:biography,
  phone:phone,
  is_public:is_public
  }
) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("username", sql.NVarChar, username)
      .input("password", sql.NVarChar, password)
      .input("email", sql.NVarChar, email)
      .input("biography", sql.NVarChar, biography)
      .input("phone", sql.NVarChar, phone)
      .input("is_public", sql.Bit, is_public)
      .output("error", sql.Int)
      .output("message", sql.NVarChar)
      .execute("AddUser");

    return results;
  } catch (err) {
    console.log(err);
  }
};
let deleteUser = async (username) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .output("error", sql.Int)
      .output("message", sql.NVarChar)
      .execute("DeleteUser");

      return results;
  } catch (err) {
    console.log(err);
  }
};
let updateUser = async (
  name,
  username,
  password,
  email,
  biography,
  phone,
  is_public
) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
    .request()
    .input("name", sql.NVarChar, name)
    .input("username", sql.NVarChar, username)
    .input("password", sql.NVarChar, password)
    .input("email", sql.NVarChar, email)
    .input("biography", sql.NVarChar, biography)
    .input("phone", sql.NVarChar, phone)
    .input("is_public", sql.Bit, is_public)
    .output("error", sql.Int)
    .output("message", sql.NVarChar)
    .execute("UpdateUser");

    return results;
  } catch (err) {
    console.log(err);
  }
};
let findUser = async (
    username
  ) => {
    try {
      let pool = await sql.connect(config);
      let results = await pool
      .request()
      .query(`SELECT * FROM VUsers where username = '${username}'`);
      return results;
    } catch (err) {
      console.log(err);
    }
  };

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  findUser
};
