const express = require("express");

//Routes
const urlRouter = require("./routes/urlRoute");
const { getOneUrl } = require("./database/queries");

const app = express();

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
