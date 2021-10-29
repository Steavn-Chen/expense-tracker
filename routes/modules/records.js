const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getFormatDate } = require('../../tools/dataTool')

router.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .then((categories) => res.render('new', { categories }))
    .catch((err) => console.log(err))
})

router.post('/new', (req, res) => {
  const { name, date, category, amount, merchant } = req.body
  const userId = req.user._id
  return Category.findOne({ category })
    .lean()
    .then((categoryData) => {
      return Record.create({
        name,
        date,
        category,
        amount,
        merchant,
        categoryIcon: categoryData.categoryIcon,
        categoryId: categoryData._id,
        userId
      })
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
    })
})

router.get('/:record_id/edit', (req, res) => {
  const _id = req.params.record_id
  const userId = req.user._id
  return Category.find()
    .lean()
    .then(categories =>
      Record.findOne({ _id, userId })
        .lean()
        .then((record) => {
          getFormatDate(record)
          res.render('edit', { record, categories })
        })
        .catch((err) => console.log(err))
    )
})

router.put('/:record_id', (req, res) => {
  const _id = req.params.record_id
  const userId = req.user._id
  const category = req.body.category
  const body = req.body
  return Category.findOne({ category })
    .lean()
    .then(categoryData => {
      console.log(categoryData)
      Record.findOne({ _id, userId })
        .then((record) => {
          const icon = { categoryIcon: categoryData.categoryIcon }
          console.log(icon)
          return Object.assign(record, body, icon).save()
        })
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
    })
})

router.delete('/:record_id', (req, res) => {
  const _id = req.params.record_id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .then(record => {
      return record.remove()
    })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router