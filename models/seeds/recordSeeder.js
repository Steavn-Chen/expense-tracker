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
  { name: "user3", email: "user3@example.com", password: "12345678" },
  // { name: "user4", email: "user4@example.com", password: "12345678" },
  // { name: "user5", email: "user5@example.com", password: "12345678" },
];

db.once('open', () => { 
  SEED_USER.forEach((item, index) => { 
    return bcrypt
      .genSalt(8)
      .then(salt => bcrypt.hash(item.password, salt))
      .then(hash => {
        return User.create({
          name: item.name,
          email: item.email,
          password: hash
        })
      })
      .then(user => {
        // 簡寫 成功1.
        // const userId = { userId: user._id }
        //  let data = recordData.map((data) => Object.assign(data, userId))
        //    .slice(index * 5, index * 5 + 5)
        //    return Record.insertMany(data);
        // 己成功1.
        // const userId = { userId: user._id }
        // let data = recordData.map(data => Object.assign(data, userId))
        // let start = index * 5;
        // let end = index * 5 + 5;
        // console.log(data.length, start, end)
        // let newData = data.slice(start, end)
        // console.log(newData, index);

        // 第二種 for of 寫法
        // const userId = user._id
        // for (let record of recordData) {
        //   record.userId = userId
        // }
        // return Record.insertMany(recordData.slice(index * 5, index * 5 + 5));
        // return insertMany(newData)
   
        //第三種 for 迴圈寫法 
        const userId = user._id;
        for (let i = 0; i < recordData.length; i++) {
          Object.assign(recordData[i], { userId:userId })
        }
        return Record.insertMany(recordData.slice(index * 5, index * 5 + 5));

        //  Array.form 創建資料多的話會失敗
        // const userId = user._id
        // return Promise.all(
        //   Array.from({ length: 5 }, (_, i) =>
        //     Record.create({ ...recordData[index * 5 + i], userId })
        //   )
        // );
      })

      .then(() => {
        db.close()
        console.log('insert recordSeeder done.');
      })
      .catch(err => console.log(err))
  })

})