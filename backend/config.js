require("dotenv").config({ path: "../.env" });
module.exports = {
  PORT: process.env.PORT,
  URL: process.env.URL,
  JWT_KEY: process.env.JWT_KEY,
};
