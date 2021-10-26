function getCategoryIcon(categories, category) {
  return categories.find(item => item.category === category).categoryIcon
}

function getTotalAmount(records) {
  let total = 0
  records.forEach(item => {
    total += item.amount
  })
  return total
}

function getFilterRecords(records, options) {
  let filterResult = records.filter(
    (record) => record.category === options.filterCategory
  )
  if (!filterResult.length) filterResult = records;
    return filterResult;
}

module.exports = { getCategoryIcon, getTotalAmount, getFilterRecords };
