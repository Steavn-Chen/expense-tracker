const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) =>{
     User.findOne({ email })
     .then(user => {
       if (!user) {
         return done(null, false, { message: '此帳號還沒註冊。'})
       }
       if (user.password !== password) {
         return done(null, false, { message: '密碼或者電子郵件有錯誤 !'})
       }
       return done(null, user)
     })
     .catch(err => console.log(err))
  }))

  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}