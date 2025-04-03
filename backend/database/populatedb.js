require("dotenv").config();
const { argv } = require("node:process");

const { Client } = require("pg");

console.log(argv[2]);

const SQL = `
CREATE TABLE IF NOT EXISTS urls (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  urlLong VARCHAR ( 255 ), urlShort VARCHAR ( 255 ), path VARCHAR ( 255 ), userId VARCHAR ( 255 )
);

INSERT INTO urls (urlLong, urlShort, path, userId) 
VALUES
  ('www.google.com',
  'www.sh.cz/48916',
  '48916',
  '489445');
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
