const moment = require('moment')

function getFormatDate (record) {
  return record.date = moment(record.date).format('YYYY-MM-DD')
}

function getCategoryIcon (categories, category) {
  return categories.find(item => item.category === category).categoryIcon
}

function getCategoryId (categories, category) {
  return categories.find((item) => item.category === category)._id
}

function getTotalAmount (records) {
  let total = 0
  records.forEach(item => {
    total += item.amount
  })
  return total
}

function getFilterRecords (records, options, categories) {
  const filterResult = records.filter(record => {
    if (options.filterCategory) {
      if (record.category === options.filterCategory) {
        return record
      } 
      else if (categories.every((item) => { return item.category !== options.filterCategory})) {
        return records
      }
    }
  })
  return filterResult
}

function getFilterYear (records) {
  let newRecords = records.map((record) => ({
    year: moment(record.date).format('YYYY')
  }))
  newRecords = [
    ...new Set(newRecords.map((item) => JSON.stringify(item)))
  ].map((item) => JSON.parse(item))
  newRecords.sort(function (a, b) {
    return parseInt(a.Year) < parseInt(b.Year) ? 1 : -1
  })
  return newRecords
}

module.exports = {
  getCategoryIcon,
  getTotalAmount,
  getFilterRecords,
  getCategoryId,
  getFilterYear,
  getFormatDate
}
