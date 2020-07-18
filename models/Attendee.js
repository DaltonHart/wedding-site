const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Attendee",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      status: { type: Boolean, required: true },
      plusOne: { type: Boolean },
      plusOneName: { type: String },
    },
    { timestamps: true }
  )
);
