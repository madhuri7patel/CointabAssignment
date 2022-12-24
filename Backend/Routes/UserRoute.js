const { Router } = require("express");
const { UserModel } = require("../Models/users.model");
const UserRoute = Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

UserRoute.post("/post", async (req, res) => {
  try {
    Promise.all([
      fetch("https://randomuser.me/api?results=100").then((res) => res.json()),
    ]).then((val) => {
      UserModel.collection.deleteMany();
      let result = val[0].results;
      console.log(result);
      let data = UserModel({ results: result });
      data.save();
      res.send("Data stored sucessfully in DB");
    });
  } catch (err) {
    console.log(err.messege);
  }
});

UserRoute.get("/", async (req, res) => {
  try {
    let data = await await UserModel.find({});
    res.send(data);
  } catch (err) {
    console.log(err.messege);
  }
});

UserRoute.delete("/delete", async (req, res) => {
  try {
    let data = await UserModel.collection.deleteMany();
    res.send(data);
  } catch (err) {
    console.log(err.messege);
  }
});

module.exports = {
  UserRoute,
};
