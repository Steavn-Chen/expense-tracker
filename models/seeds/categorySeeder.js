const db = require("../../config/mongoose");
const Record = require('../record')
const Category = require('../category')
const categoryData = require('../../category.json')


db.once('open', () => {
  console.log('mongodb is connected')
  for (let i = 0; i < categoryData.length; i++) {
    Category.create(categoryData[i])
  }
  console.log('done')
  // process.exit()
})