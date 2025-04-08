const mongoose = require("mongoose");
require("dotenv").config();
const mongoUrl = process.env.DB_URl_LOCAL;

// const mongoUrl = process.env.DB_URl;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("connected", () => {
  console.log("server is connected with db");
});
db.on("error", (err) => {
  console.log("error", err);
});

db.on("disconnected", () => {
  console.log("server is disconnected with db");
});
module.exports = db;
