const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record')
const Category = require('./models/category')
const methodOverride = require('method-override')
// const hbsHelpers = require('handlebars-helpers')
const {
  getCategoryIcon,
  getTotalAmount,
  getFilterRecords,
} = require("./tools/dataTool.js");

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


app.get('/filter', (req, res) => {
  const options = req.query;
  return Category.find()
  .lean()
  .then(categories => { 
    Record.find()
      .lean()
      .then((records) => {
        const filterResults = getFilterRecords(records, options);
        const totalAmount = getTotalAmount(filterResults);
        res.render('index', {
          options,
          categories,
          records: filterResults,
          totalAmount,
        });
      })
      .catch((error) => console.log(error));
      })
});

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
        res.render('edit', { record, categories })})
        .catch(err => console.log(err))
        )
})

app.put('/records/:record_id', (req, res) => {
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

app.delete('/records/:record_id', (req, res) => {
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