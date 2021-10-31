const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const monthList = require('../../models/seeds/month.json')
const { getTotalAmount, getFilterYear, getFormatDate } = require('../../tools/dataTool')

router.get('/', (req, res) => {
  const query = req.query
  console.log(query)
  const userId = req.user._id
  return Record.find({ userId })
    .lean()
    .then(records => {
      Category.find()
        .lean()
        .then(categories => {
          const yearList = getFilterYear(records)
          const totalAmount = getTotalAmount(records)
          records.forEach((record) => getFormatDate(record))
          res.render('index', {
            records,
            categories,
            totalAmount,
            monthList,
            yearList
          })
        })
        .catch((err) => console.log(err))
    })
})

module.exports = router