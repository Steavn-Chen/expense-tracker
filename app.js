const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record')
const Category = require('./models/category')
const { getCategoryIcon } = require('./tools/dataTool.js')
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
        .then(categories => res.render('index', { records, categories }))
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

app.get('/records/edit', (req, res) => {
  res.render('edit')
})

app.post('/records/edit', (req, res) => {
  res.render('edit')
})

app.listen(port, () => {
  console.log(`Expense-Tracker web on http://localhost:${port}`)
})