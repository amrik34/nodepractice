const express = require("express");
const router = express.Router();

const Person = require("../models/person");
const { jwtAuthMiddleWare, generateToken } = require("./../jwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    // create a new user data
    const newPerson = new Person(data);
    // save the person data to database
    response = await newPerson.save();
    console.log("data saved");
    const payload = {
      id: response.id,
      username: response.username,
    };

    const token = generateToken(payload);
    console.log("token is: ", token);

    res.status(200).json({ response: response, Token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server errors", err });
  }
});

// login router
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });
    console.log(user, "user");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "invaild username and password" });
    }
    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "internal server errors", err });
  }
});
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server errors" });
  }
});
router.get("/", jwtAuthMiddleWare, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data get it");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server errors person", err });
  }
});
router.get("/profile", jwtAuthMiddleWare, async (req, res) => {
  try {
    const userdata = req.user;
    console.log("userdata", userdata);
    const userId = userdata.id;
    const user = await Person.findById(userId);
    console.log("user", user);
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server errors person", err });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType === "Chef" ||
      workType === "Waiter" ||
      workType === "Manager"
    ) {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json("invaild work type");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server errors" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ Error: "Person not found" });
    }
    console.log("data is updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server errors" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    res.status(200).json({ Message: "Person data deleted successfully" });
    if (!response) {
      return res.status(404).json({ Error: "Person not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server errors" });
  }
});

module.exports = router;
