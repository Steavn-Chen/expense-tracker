const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const filter = require('./modules/filter')
const records = require('./modules/records')
const users = require('./modules/users')

router.use('/', home)
router.use('/filter', filter)
router.use('/records', records)
router.use('/users', users)

module.exports = router