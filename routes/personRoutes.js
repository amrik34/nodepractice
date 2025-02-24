const express = require("express");
const router = express.Router();
const Person = require("../models/person");
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
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data get it");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server errors person" });
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
