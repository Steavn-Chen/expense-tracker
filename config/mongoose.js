const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/expense-trackers", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb connected error");
});

db.once("open", () => {
  console.log("mongodb is connected");
});

module.exports = db