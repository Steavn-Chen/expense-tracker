const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const monthList = require('../../models/seeds/month.json')
const { getTotalAmount, getFilterYear, getFormatDate } = require('../../tools/dataTool')

router.get('/', (req, res) => {
  const query = req.query.keyword.trim()
  const userId = req.user._id
  return Record.find({ userId, name: new RegExp(query, 'i') })
    .lean()
    .then(records => {
      Category.find()
        .lean()
        .then(categories => {
          const yearList = getFilterYear(records)
          const totalAmount = getTotalAmount(records)
          records.forEach((record) => getFormatDate(record))       
          if (records.length === 0) {
            return res.render('searchOut', { query })
          }
            return res.render('index', {
              records,
              categories,
              totalAmount,
              monthList,
              yearList
              // keyword
            })
          })
        .catch((err) => console.log(err))
    })
})

module.exports = router