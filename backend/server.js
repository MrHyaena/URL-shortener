const express = require("express");
const cors = require("cors");

//Routes
const urlRouter = require("./routes/urlRoute");
const { getOneUrl } = require("./database/queries");

const app = express();

//Middleware
app.use(cors());

app.use("/url", express.json(), urlRouter);

app.get("/:path", async (req, res) => {
  const { path } = req.params;
  const rows = await getOneUrl("path", path);
  const targetUrl = rows[0];
  res.redirect("https://" + targetUrl.urllong);
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
