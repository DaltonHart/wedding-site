const express = require("express");

const app = express();
require("dotenv").config();

const { Attendee } = require("./models");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/attendees", async (req, res) => {
  try {
    const attendees = await Attendee.find({});
    res.render("attendees", { attendees });
  } catch (err) {
    res.json({ err: err.message });
  }
});

app.post("/attendees", async (req, res) => {
  try {
    const createdAttendee = await Attendee.create(req.body);
    res.status(201).json({ attendee: createdAttendee });
  } catch (err) {
    res.json({ err: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Wedding bells ringing.. at ${process.env.PORT}`);
});
