const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '每個欄位都是必填的。'})
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不同喔 !'})
  }
  if (errors.length) {
    return res.render('register', {
    name, 
    email, 
    password, 
    confirmPassword,
    errors
    })
  }
    User.findOne({ email }).then(user => { 
      if (user) {
        errors.push({ message: '這個電子郵件地址己被註冊。'})
        return res.render('register', { name, email, password, confirmPassword, errors });
      } else {
        return User.create({
          name,
          email,
          password,
        })
          .then(() => res.redirect('/'))
          .catch((err) => console.log(err));
      }
    });
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你己經成功登出了。')
  res.redirect('/users/login')
})

module.exports = router