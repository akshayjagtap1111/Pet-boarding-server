const { DB, PORT } = require("./index");

const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    return await connect(DB);
  } catch (err) {
    console.log("error form connection :", err.message);
  }
};

module.exports = connectDB;