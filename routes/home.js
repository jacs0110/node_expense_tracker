const express = require('express')
const router = express.Router()
const db = require('../models')
// const User = db.User
const Record = db.Record
const Category = db.Category

router.get('/', async (req, res) => {

  try {
    let rawRecords = await db.sequelize.query('SELECT Records.id,Records.date,Records.name,Records.amount,Records.CategoryId, Categories.categoryName,Categories.icon FROM Records JOIN Categories ON Records.CategoryId = Categories.id ORDER BY Records.date DESC')

    rawRecords[0].forEach(element => {
      element.date = element.date.toISOString().split("T")[0]
    });
    console.log(rawRecords[0])
    let categoryList = await Category.findAll({
      order: [
        ['categoryName', 'ASC'],
      ],
    })
    return res.render('index', { records: rawRecords[0], categoryList: categoryList })
  } catch (e) {
    return res.status(422)
  }


  // Record.findAll({
  //   order: [
  //     ['date', 'DESC'],
  //     ['name', 'ASC'],
  //   ],
  // })
  //   .then((records) => {
  //     return res.render('index', { records: records, categories: categories })
  //   })
  //   .catch((error) => {
  //     return res.status(422).json(error)
  //   })
})

module.exports = router