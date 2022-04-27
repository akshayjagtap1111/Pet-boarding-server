require("dotenv").config();

module.exports = {
  DB: process.env.APP_DB,
  PORT: process.env.PORT,
  SECRET: process.env.APP_SECRET,
};
