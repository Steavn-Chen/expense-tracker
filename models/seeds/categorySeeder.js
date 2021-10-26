const db = require("../../config/mongoose");
const Category = require('../category')
const categoryData = require("./category.json");

db.once('open', () => {
  // console.log('mongodb is connected')
  // for (let i = 0; i < categoryData.length; i++) {
  //   Category.create(categoryData[i])
  // }
  // db.close()
  // console.log('done')
  Category.insertMany(categoryData)
  .then(() => db.close())
  console.log("insert categorySeeder done.");
})