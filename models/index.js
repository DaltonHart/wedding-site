const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(function () {
    console.log("Mongodb connected...");
  })
  .catch(function (error) {
    console.log(error);
  });

mongoose.connection.on("disconnected", function () {
  console.log("Mongodb disconnected....");
});

module.exports = {
  Attendee: require("./Attendee"),
};
