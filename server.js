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
    let total = attendees.length;
    attendees.forEach(attend => {
      if (!attend.status) {
        total -= 1;
      }
      if (attend.additions.length) {
        total += attend.additions.length;
      }
    });
    res.render("attendees", { attendees, total });
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

app.post("/email", async (req, res) => {
  try {
    res.status(201).json({ sent: "sucess" });
  } catch (err) {
    res.json({ err: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Wedding bells ringing.. at ${process.env.PORT}`);
});
