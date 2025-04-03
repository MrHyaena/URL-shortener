//Router for URLs handling
//------------------------------------------------

//Reguirements
require("dotenv").config();
const crypto = require("crypto");
const express = require("express");
const pool = require("../database/pool");
const {
  getAllUrls,
  getOneUrl,
  createUrl,
  deleteUrl,
} = require("../database/queries");

const redirectURL = "http://localhost:4000/";

//Creating router
const router = express.Router();

// ------------------ ROUTES --------------------------

router.get("/get/all", async (req, res) => {
  const rows = await getAllUrls();
  res.json(rows);
});

router.get("/get/:path", async (req, res) => {
  const { path } = req.params;
  const rows = await getOneUrl("path", path);
  console.log(rows[0]);
  res.json(rows[0]);
});

router.post("/create", async (req, res) => {
  const { urlLong } = req.body;
  console.log(req.body);
  const path = crypto.randomBytes(4).toString("hex");
  const urlShort = redirectURL + path;
  await createUrl(urlLong, urlShort, path);
  res.json({ urlShort: urlShort, path: path });
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
