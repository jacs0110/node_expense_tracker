const express = require('express')
const router = express.Router()
const db = require('../models')
// const User = db.User
const Record = db.Record

router.get('/', (req, res) => {
  Record.findAll({
    order: [
      ['date', 'DESC'],
      ['name', 'ASC'],
    ],
  })
    .then((records) => {
      return res.render('index', { records: records })
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

module.exports = router