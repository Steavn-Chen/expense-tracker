const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Records = require('./record.json')
const Category = require('./category.json')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-trackers', { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb connected error')
})

db.once('open', () => {
  console.log('mongodb is connected')
} )

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main' , extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { Records } )
})

app.get('/records/new', (req, res) => {
  res.render('new')
})

app.post('/records/new', (req, res) => {
  res.render('new')
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