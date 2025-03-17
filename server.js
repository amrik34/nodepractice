// // // var age = [16, 32, 48, 64];

// // // const result = age.filter(checkAge);
// // // var checkAge = function (age) {
// // //   return age >= 49;
// // // };
// // // console.log(result);
// // // var prompt = require("prompt-sync")();
// // // var age = prompt("what is your age?");
// // // if (age < 18) {
// // //   console.log("you will  200% discount");
// // // } else {
// // //   console.log("you will  10% discount");
// // // }
// // // var add = (a, b) => a * b;
// // // console.log(add(501, 10));
// // // (function () {
// // //   console.log("test");
// // // })();

// // //call back funtion
// // // function callBack() {
// // //   console.log("call back is calling");
// // // }
// // var sum = function (a, b, callBack) {
// //   var result = a + b;
// //   console.log("res" + result);
// //   callBack();
// // };
// // // sum(5, 2, function () {
// // //   console.log("call back again");
// // // });
// // sum(5, 2, () => console.log("call back again"));
// var fs = require("fs");
// var os = require("os");
// var user = os.userInfo();
// console.log(user.username, "user");
// fs.appendFile("welcomefile.text", "hi" + user.username + "!\n", () =>
//   console.log("file is created.")
// );
// console.log("os lib", os);

// var notes = require("./notes");
// var _ = require("lodash");
// var age = notes.age;
// var sum = notes.add;
// console.log(sum(age + 15, 10));
// var data = ["person", "Person", "person", 1, 1, 2, 2, "test", "2", "1"];
// var filter = _.uniq(data);
// console.log(filter);
// console.log(_.random(), "d0dd");

// const stringData = '{"name":"jhone", "age":30}';
// const jsonObj = JSON.parse(stringData);
// // console.log(jsonObj);
// const jsData = { name: "jhone", age: 30 };
// const jsonStrin = JSON.stringify(jsData);
// console.log(jsonStrin);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./db");
const cors = require("cors");

// Allow all origins
app.use(cors());
app.get("/check-mongo", async (req, res) => {
  const state = mongoose.connection.readyState; // Returns 0, 1, 2, or 3
  const status = ["Disconnected", "Connected", "Connecting", "Disconnecting"];

  res.json({ mongoStatus: status[state] });
});
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.send("Welcome to the Hotel taaz");
});

require("dotenv").config();
// imports routes
const personRouter = require("./routes/personRoutes");
const menuItemRouter = require("./routes/menuItemRoutes");

//use the routers
app.use("/person", personRouter);
app.use("/menuitem", menuItemRouter);

const PORT = process.env.PORT || 2000;
app.get("/check-mongo", async (req, res) => {
  const state = mongoose.connection.readyState; // Returns 0, 1, 2, or 3
  const status = ["Disconnected", "Connected", "Connecting", "Disconnecting"];
  res.json({ mongoStatus: status[state] });
});
app.listen(PORT, () => {
  console.log("server is started");
});
