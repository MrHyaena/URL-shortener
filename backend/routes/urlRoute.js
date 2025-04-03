//Router for URLs handling
//------------------------------------------------

//Reguirements
require("dotenv").config();
const express = require("express");
const pool = require("../database/pool");

//Creating router
const router = express.Router();

// ------------------ ROUTES --------------------------

router.get("/get/all", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM urls");
  console.log(rows);
  res.json(rows);
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;

  res.json("Get one " + id);
});

router.post("/create", async (req, res) => {
  const { urlLong, urlShort, userId } = req.body;
  await pool.query(
    "INSERT INTO urls (urlLong, urlShort, userId) VALUES ($1, $2, $3)",
    [urlLong, urlShort, userId]
  );
  res.json("Create url");
});

router.post("/delete", async (req, res) => {
  res.json("Delete url");
});

module.exports = router;
