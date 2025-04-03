const express = require("express");

//Routes
const urlRouter = require("./routes/urlRoute");

const app = express();

app.use("/url", express.json(), urlRouter);

app.listen(4000, () => {
  console.log("listening on port 4000");
});
