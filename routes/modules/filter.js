const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getTotalAmount, getFilterRecords } = require('../../tools/dataTool')

router.get('/', (req, res) => {
  const userId = req.user._id
  const options = req.query
  return Category.find()
    .lean()
    .then(categories => { 
      Record.find({ userId })
        .lean()
        .then(records => { 
          const filterResults = getFilterRecords(records, options, categories);
          const totalAmount = getTotalAmount(filterResults)
          res.render('index', {
            options,
            categories,
            records: filterResults,
            totalAmount
          })
        })
        .catch((error) => console.log(error))
    })
})

module.exports = router