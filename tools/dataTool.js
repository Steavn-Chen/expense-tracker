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

function getFilterRecords(records, options, categories) {
  let filterResult = records.filter(record => {
    if (options) {
      if (record.category === options.filterCategory) {
        return record
      } else if (categories.every(item => {
        return item.category !== options.filterCategory         
      })) { 
        return records
      }
    }
  })
  return filterResult
}

module.exports = {
  getCategoryIcon,
  getTotalAmount,
  getFilterRecords,
  getCategoryId,
};
