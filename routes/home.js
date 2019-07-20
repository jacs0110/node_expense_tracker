const express = require('express')
const router = express.Router()
// const db = require('./models')
// const User = db.User
// const Expense = db.Expense

router.get('/', (req, res) => {
  res.send('this is the home page')
})

module.exports = router