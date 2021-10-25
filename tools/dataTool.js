function getCategoryIcon(categories, category) {
  return categories.find(item => item.categoryName === category).categoryIcon
}

function getTotalAmount(records) {
  let total = 0
  records.forEach(item => {
   console.log(item,typeof total, typeof item.amount, item.amount)
    total += item.amount
  })
  return total
}

module.exports = { getCategoryIcon, getTotalAmount }
