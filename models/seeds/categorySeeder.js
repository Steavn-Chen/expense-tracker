const mongoose = require('mongoose')
const Record = require('../record')
const Category = require('../category')

const categoryData = require('../../category.json')

mongoose.connect('mongodb://localhost/expense-trackers', { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb connected error')
})

db.once('open', () => {
  console.log('mongodb is connected')
  for (let i = 0; i < categoryData.length; i++) {
    Category.create(categoryData[i])
  }
  console.log('done')
  // process.exit()
})