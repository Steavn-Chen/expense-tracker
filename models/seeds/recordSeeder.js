const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const recordData = require('../../record.json')
const categoryData = require('../../category.json')

db.once('open', () => {
  console.log('mongodb is connected')
  recordData.forEach(record => Record.create(record))
  Category.insertMany(categoryData)
  
  console.log('recordData is done')
  // process.exit()
})