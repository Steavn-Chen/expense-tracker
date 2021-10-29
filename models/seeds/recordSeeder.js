if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const Record = require('../record')
const Category = require('../category')
const recordData = require('./record.json')
const categoryData = require('./category.json')
const User = require('../user')
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')

const SEED_USER = [
  { name: "user1", email: "user1@example.com", password: "12345678" },
  { name: "user2", email: "user2@example.com", password: "12345678" },
  { name: "user3", email: "user3@example.com", password: "12345678" }
]


db.once('open', () => { 
  return Category.find()
    .lean()
    .then(categories => {
      SEED_USER.forEach((item, index) => { 
        return bcrypt
          .genSalt(8)
          .then((salt) => bcrypt.hash(item.password, salt))
          .then((hash) => {
            return User.create({
              name: item.name,
              email: item.email,
              password: hash,
            });
          })
          .then((user) => {
            const userId = user._id;
            for (let i = 0; i < recordData.length; i++) {
              const categoryId = categories.find(
                (item) => item.category === recordData[i].category
              )._id;
              const categoryIcon = categories.find(
                (item) => item.category === recordData[i].category
              ).categoryIcon;
              Object.assign(recordData[i], {
                userId,
                categoryId,
                categoryIcon,
              });
            }
            return Record.insertMany(
              recordData.slice(index * 5, index * 5 + 5)
            );
          })
          .then(() => {
            // db.close()
            console.log("insert recordSeeder done.");
            process.exit();
          })
          .catch((err) => console.log(err));
      })
    })
})