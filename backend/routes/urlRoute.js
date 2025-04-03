//Router for URLs handling
//------------------------------------------------

//Reguirements
require("dotenv").config();
const express = require("express");

//Creating router
const router = express.Router();

// ------------------ ROUTES --------------------------

router.get("/get/all", async (req, res) => {
  res.json("Get all");
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;

  res.json("Get one " + id);
});

router.post("/create", async (req, res) => {
  res.json("Create url");
});

router.post("/delete", async (req, res) => {
  res.json("Delete url");
});

module.exports = router;
