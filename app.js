const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Records = require('./record.json')
const Categories = require('./category.json')

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

app.listen(port, () => {
  console.log(`Expense-Tracker web on http://localhost:${port}`)
})