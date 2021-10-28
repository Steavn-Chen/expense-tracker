const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const monthList = require('../../models/seeds/month.json')
const {
  getTotalAmount,
  getFilterRecords,
  getFilterYear,
  getFormatDate,
} = require("../../tools/dataTool");

router.get('/', (req, res) => {
  const userId = req.user._id
  const options = req.query
  // console.log(options)
  let filterCondition = { userId }
  console.log(filterCondition);
  //  if (options.filterMonth) {
  //    filterCondition = {
  //      ...filterCondition,
  //      date: {
  //        $gte: startDate.toISOString().split("T")[0],
  //        $lt: endDate.toISOString().split("T")[0],
  //      },
  //    };
  //  }
   console.log(filterCondition);
  if (options.filterCategory) {
    filterCondition = { ...filterCondition, category:options.filterCategory };
  }
  console.log(filterCondition);
  return Category.find()
    .lean()
    .then(categories => {
      Record.find(filterCondition)
        // Record.find({ userId })
        .lean()
        .then((records) => {
          // const filterResults = getFilterRecords(records, options, categories);
          console.log(records,'front')
           records.forEach((record) => getFormatDate(record));
          console.log(records, "back")
          const yearList = getFilterYear(records);
          // const totalAmount = getTotalAmount(filterResults);
          const totalAmount = getTotalAmount(records);
          res.render("index", {
            options,
            categories,
            records,
            // records: filterResults,
            totalAmount,
            monthList,
            yearList,
          });
        })
        .catch((error) => console.log(error));
    })
})

module.exports = router