const mongoose = require("mongoose");
// const mongoUrl = "mongodb://localhost:27017/hotel";
const mongoUrl =
  "mongodb+srv://amriks25:Koavkw3THdYU6c8p@cluster0.16vpx.mongodb.net/";

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
