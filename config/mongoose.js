const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI  
  mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  });

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb connected error");
});

db.once("open", () => {
  console.log("mongodb is connected");
});

module.exports = db