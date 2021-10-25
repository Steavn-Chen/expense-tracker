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

module.exports = { getCategoryIcon, getTotalAmount }
