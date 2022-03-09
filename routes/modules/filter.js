const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const monthList = require('../../models/seeds/month.json')
const moment = require('moment')
const {
  getTotalAmount,
  getFilterYear,
  getFormatDate
} = require('../../tools/dataTool')

router.get('/', (req, res) => {
  const userId = req.user._id
  const options = req.query
  let filterCondition = { userId }

  //  追加 年 月 按紐未完成的 CODE
  // let startYear = `${options.filterYear}` === "allYear" ? new Date().getFullYear() - 100 : `${options.filterYear}`;
  // let endYear = `${options.filterYear}` === "allYear" ? new Date().getFullYear(): `${options.filterYear}`;

  const startYear = new Date().getFullYear() 
  const endYear = new Date().getFullYear()
  const startMonth = `${options.filterMonth}` === 'allMonths' ? '01' : `${options.filterMonth}`
  const endMonth = `${options.filterMonth}` === 'allMonths' ? '12' : `${options.filterMonth}`
  const day = new Date(`${endYear}`, `${endMonth}`, 0).getDate()
  const startDate = `${startYear}-${startMonth}-01T00:00:00.000Z`.toString()
  const endDate = `${endYear}-${endMonth}-${day}T00:00:00.000Z`.toString()

  if (options.filterMonth !== 'allMonths') {
    filterCondition = {
      ...filterCondition,
      date: {
        $gte: moment(startDate).format('YYYY-MM-DD'),
        $lt: moment(endDate).format('YYYY-MM-DD')
      }
    }
  }

  if (options.filterCategory) {
    if (options.filterCategory !== '全部類別') {
      filterCondition = {
        ...filterCondition,
        category: options.filterCategory
      }
    }
  }
  console.log(filterCondition)
  return Category.find()
    .lean()
    .then((categories) => {
      Record.find(filterCondition)
        .lean()
        .then((records) => {
          records.forEach((record) => getFormatDate(record))
          const yearList = getFilterYear(records)
          const totalAmount = getTotalAmount(records)
          res.render('index', {
            options,
            categories,
            records,
            totalAmount,
            monthList,
            yearList
          })
        })
        .catch((error) => console.log(error))
    })
})

module.exports = router