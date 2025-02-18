const express = require("express");
const router = express.Router();

const MenuItem = require("../models/menuItem");
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    response = await newMenuItem.save();
    console.log("item saveed");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server errors" });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data showing");

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server errors" });
  }
});
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (
      tasteType === "sweet" ||
      tasteType === "spicy" ||
      tasteType === "sour"
    ) {
      const response = await MenuItem.find({ taste: tasteType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ Err: "invaild taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server errors" });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    const updateMenuData = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuId, updateMenuData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ Error: "Menu not found" });
    }
    console.log("Menu data is updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server errors" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await MenuItem.findOneAndDelete(menuId);
    if (!response) {
      return res.status(404).json({ Error: "Menu not found" });
    }
    console.log("Menu data is deleted");
    res.status(200).json({ Message: "Menu data is deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal server errors" });
  }
});
module.exports = router;
