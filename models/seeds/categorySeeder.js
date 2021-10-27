const Category = require('../category')
const categoryData = require("./category.json");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require("../../config/mongoose");
db.once('open', () => {
  Category.insertMany(categoryData)
  .then(() => db.close())
  console.log("insert categorySeeder done.");
})