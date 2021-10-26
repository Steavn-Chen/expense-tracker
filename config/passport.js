const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

module.export = app => {
  app.uer(passport.initialize())
  app.use(passport.session())

  passport.uer(new LocalStrategy({ usernameField: email }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: '這個帳號未被註冊 。' })
        }
        if (user.password !== password) {
          return done(null, false, { message: '電子郵件地址或密碼有錯 !'})
        }
        return done(null, user)
      })
      .catch(err => console.log(err))
  }))

  passport.serializeUser((user, done) => {
    return done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User.fineById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}