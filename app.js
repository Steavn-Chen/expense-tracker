const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record')
const Category = require('./models/category')
const { getCategoryIcon, getTotalAmount } = require('./tools/dataTool.js')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-trackers', { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb connected error')
})

db.once('open', () => {
  console.log('mongodb is connected')
})

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(records => {
      Category.find()
        .lean()
        .then(categories => {
          const totalAmount = getTotalAmount(records)
          res.render('index', { records, categories, totalAmount })
        })
        .catch(err => console.log(err))
    }
    )
})

app.get('/records/new', (req, res) => {
  return Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.log(err))
})

app.post('/records/new', (req, res) => {
  const { name, date, category, amount, merchant } = req.body
  return Category.find()
    .lean()
    .then(categories => { 
      const categoryIcon = getCategoryIcon(categories, category);
      return Record.create({
        name,
        date,
        category,
        amount,
        merchant,
        categoryIcon: getCategoryIcon(categories, category)
      })
        .then(() => res.redirect("/"))
        .catch((err) => console.log(err));
    })
})

app.get('/records/:record_id/edit', (req, res) => {
  const _id = req.params.record_id
  return Category.find()
    .lean()
    .then(categories =>    
      Record.findById(_id)
       .lean()
       .then(record => { 
        res.render('edit', { record, categories})})
        .catch(err => console.log(err))
        )
})

app.post('/records/:record_id/edit', (req, res) => {
  const _id = req.params.record_id;
  const category = req.body.category;
  const body = req.body;
  return Category.find()
    .lean()
    .then(categories => {
      Record.findById(_id)
      .then(record => {   
        const icon = { categoryIcon: getCategoryIcon(categories, category) }
        return Object.assign(record, body, icon).save()
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    })
})

app.post('/records/:record_id/delete', (req, res) => {
  const _id = req.params.record_id
  Record.findById(_id)
  .then(record => {
    return record.remove();
  })
  .then(() => res.redirect('/'))
  .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`Expense-Tracker web on http://localhost:${port}`)
})