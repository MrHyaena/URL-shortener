//Router for URLs handling
//------------------------------------------------

//Reguirements
require("dotenv").config();
const express = require("express");
const pool = require("../database/pool");
const {
  getAllUrls,
  getOneUrl,
  createUrl,
  deleteUrl,
} = require("../database/queries");

//Creating router
const router = express.Router();

// ------------------ ROUTES --------------------------

router.get("/get/all", async (req, res) => {
  const rows = await getAllUrls();
  res.json(rows);
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  const rows = await getOneUrl("id", id);
  res.json(rows[0]);
});

router.post("/create", async (req, res) => {
  const { urlLong, urlShort, path, userId } = req.body;
  await createUrl(urlLong, urlShort, userId);
  res.json("Create url");
});

router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await deleteUrl(id);
  res.json("Delete url " + id);
});

router.get("/redirect/:id", async (req, res) => {
  const { id } = req.params;
  const rows = await getOneUrl(id);
  res.json(rows[0]);
});

module.exports = router;
