const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const recordData = require('./record.json')
const categoryData = require('./category.json')

db.once('open', () => {
  Record.insertMany(recordData)
    .then(() => db.close())
    console.log("insert recordSeeder done.");
})