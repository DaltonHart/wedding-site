const express = require("express");

const app = express();
require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT, () => {
  console.log(`Wedding bells ringing.. at ${process.env.PORT}`);
});
