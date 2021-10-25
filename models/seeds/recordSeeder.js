const mongoose = require('mongoose')
const Record = require('../record')
const Category = require('../category')
const recordData = require('../../record.json')
const categoryData = require('../../category.json')

mongoose.connect('mongodb://localhost/expense-trackers', { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb connected error')
})

db.once('open', () => {
  console.log('mongodb is connected')
  // Record.insertMany(recordData)
  recordData.forEach(record => Record.create(record))
  Category.insertMany(categoryData)
  console.log('done')
} )