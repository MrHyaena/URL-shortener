require("dotenv").config();
const { argv } = require("node:process");

const { Client } = require("pg");

console.log(argv[2]);

//node database/populatedb.js

const SQL = `
CREATE TABLE IF NOT EXISTS urls (
  id INTEGER PRIMARY KEY node db/populatedb.jsGENERATED ALWAYS AS IDENTITY,
  urlLong VARCHAR ( 255 ), urlShort VARCHAR ( 255 ), path VARCHAR ( 255 ));

INSERT INTO urls (urlLong, urlShort, path) 
VALUES
  ('www.google.com',
  'www.sh.cz/48916',
  '48916');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
