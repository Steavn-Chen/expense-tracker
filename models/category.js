const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  categoryIcon: {
    type: String,
    categoryIcon: true
  }
})

module.exports = mongoose.model('Category', categorySchema)