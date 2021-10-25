const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record')
const Category = require('./models/category')
const { getCategoryIcon, getTotalAmount } = require('./tools/dataTool.js')
// const Records = require('./record.json')
// const Category = require('./category.json')

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
  Record.find()
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
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.log(err))
})

app.post('/records/new', (req, res) => {
  const { name, date, category, amount, merchant } = req.body
  Category.find()
    .lean()
    .then(categories => { 
      return Record.create({
        name,
        date,
        category,
        amount,
        merchant,
        categoryIcon: getCategoryIcon(categories, category)
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

app.get('/records/:record_id/edit', (req, res) => {
  const _id = req.params.record_id
  Category.find()
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
  const _id = req.params.record_id
  const { name, date, category, amount, merchant } = req.body
  const body = req.body
  Category.find()
    .lean()
    .then(categories => {
      Record.findById(_id)
      .lean()
      .then(record => {   
        const icon = { categoryIcon: getCategoryIcon(categories, category) }
        Object.assign(record, body, icon)
        res.render('edit', { record, categories })
      })
      .catch(err => console.log(err))
    })
})

app.listen(port, () => {
  console.log(`Expense-Tracker web on http://localhost:${port}`)
})