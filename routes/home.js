const express = require('express')
const router = express.Router()
const db = require('../models')
// const User = db.User
const Record = db.Record
const Category = db.Category

router.get('/', async (req, res) => {

  let test = await db.sequelize.query('SELECT Categories.name, Records.id, Records.date FROM Records JOIN Categories ON Records.CategoryId = Categories.id')
  console.log(test[0])

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
      return res.render('index', { records: records, categories: categories })
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

module.exports = router