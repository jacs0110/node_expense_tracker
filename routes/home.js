const express = require('express')
const router = express.Router()
const db = require('../models')
// const User = db.User
const Record = db.Record
const Category = db.Category

router.get('/', async (req, res) => {

  let categories = await Category.findAll({
    order: [
      ['name', 'ASC'],
    ],
  });

  Record.findAll({
    order: [
      ['date', 'DESC'],
      ['name', 'ASC'],
    ],
  })
    .then((records) => {
      records.forEach((item) => {
        console.log(item.name)
      })
      return res.render('index', { records: records, categories: categories })
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

module.exports = router