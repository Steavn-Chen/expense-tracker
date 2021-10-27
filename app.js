const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes/index')
const userPassport = require('./config/passport')

require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000; 

app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs", helpers: require('./tools/hbs-helpers') })
  );

app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(session({
  secret:'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

userPassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Expense-Tracker web on http://localhost:${PORT}`);
});