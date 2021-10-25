

function getCategoryIcon(categories, category) {
  return categories.find(item => item.categoryName === category).categoryIcon
}

module.exports = { getCategoryIcon }
