const pool = require("./pool");

async function getAllUrls() {
  const { rows } = await pool.query("SELECT * FROM urls");
  return rows;
}

async function getOneUrl(parameter, value) {
  let query = "SELECT * FROM urls WHERE " + parameter + " = " + value + ";";
  console.log(query);

  const { rows } = await pool.query(
    "SELECT * FROM urls WHERE " + parameter + " = ($1);",
    [value]
  );
  return rows;
}

async function createUrl(urlLong, urlShort, userId) {
  await pool.query(
    "INSERT INTO urls (urlLong, urlShort, userId) VALUES ($1, $2, $3)",
    [urlLong, urlShort, userId]
  );
}

async function deleteUrl(id) {
  await pool.query("DELETE FROM urls WHERE id = ($1)", [id]);
}

module.exports = { getAllUrls, getOneUrl, createUrl, deleteUrl };
