const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record')
const Category = require('./models/category')
const methodOverride = require('method-override')
const routes = require('./routes/index')
// const hbsHelpers = require('handlebars-helpers')

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
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs", helpers: require('./tools/hbs-helpers') })
  );
// app.engine('hbs', exphbs({ defaultLayout: "main", extname: "hbs", helpers: hbsHelpers() }));
// app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs", helpers: {
//  ifEq: function(a, b, options) {
//     if (a === b) { 
//       return options.fn(this)
//     } else {
//       return options.inverse(this)
//     }
//   }}
// }))

app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`Expense-Tracker web on http://localhost:${port}`)
})