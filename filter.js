const express = require('express')
const router = express.Router()
const Record = require('./models/record')
const Category = require('./models/category')
const monthList = require('./models/seeds/month.json')
const {
  getTotalAmount,
  getFilterRecords,
  getFilterYear
} = require("./tools/dataTool");

router.get('/', (req, res) => {
  const userId = req.user._id
  const options = req.query
  // console.log(options)
  let filterCondition = { userId }
  console.log(filterCondition);
  if (options.filterCategory) {
    filterCondition = { ...filterCondition,category };
  }
  console.log(filterCondition);
  return Category.find()
    .lean()
    .then(categories => {
      Record.find({ userId })
        .lean()
        .then((records) => {
          const filterResults = getFilterRecords(records, options, categories)
          const yearList = getFilterYear(records);
          const totalAmount = getTotalAmount(filterResults)
          res.render('index', {
            options,
            categories,
            records: filterResults,
            totalAmount,
            monthList,
            yearList
          })
        })
        .catch((error) => console.log(error))
    })
})

module.exports = router