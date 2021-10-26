const db = require("../../config/mongoose");
const Category = require('../category')
const categoryData = require("./category.json");

db.once('open', () => {
  Category.insertMany(categoryData)
  .then(() => db.close())
  console.log("insert categorySeeder done.");
})