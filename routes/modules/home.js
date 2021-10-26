const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getTotalAmount } = require('../../tools/dataTool')

router.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(records => {
      Category.find()
        .lean()
        .then(categories => {
          const totalAmount = getTotalAmount(records)
          res.render('index', { records, categories, totalAmount })
        })
        .catch((err) => console.log(err));
    })
})

module.exports = router