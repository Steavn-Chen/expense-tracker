const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
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
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.checkLogin_msg = req.flash('checkLogin_msg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Expense-Tracker web on http://localhost:${PORT}`);
});