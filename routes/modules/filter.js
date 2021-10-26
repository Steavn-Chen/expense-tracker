const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");
const { getTotalAmount, getFilterRecords } = require("../../tools/dataTool");

router.get('/', (req, res) => {
  const options = req.query
  return Category.find()
    .lean()
    .then((categories) => {
      Record.find()
        .lean()
        .then((records) => {
          const filterResults = getFilterRecords(records, options);
          const totalAmount = getTotalAmount(filterResults);
          res.render("index", {
            options,
            categories,
            records: filterResults,
            totalAmount,
          });
        })
        .catch((error) => console.log(error))
    })
})

module.exports = router;