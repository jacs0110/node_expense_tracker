const express = require('express')
const router = express.Router()
const db = require('../models')
// const User = db.User
const Record = db.Record
const Category = db.Category

router.get('/', async (req, res) => {
  console.log('req.params')
  console.log(req.query.category)
  let query = ""

  switch (req.query.category) {
    case 'all':
      query = ""
      break;
    case 'none':
      query = ""
      break;
    default:
      query = `WHERE Categories.id = ${req.query.category}`
  }

  try {
    let rawRecords = await db.sequelize.query(`SELECT Records.id,Records.date,Records.name,Records.amount,Records.CategoryId, Categories.categoryName,Categories.icon FROM Records JOIN Categories ON Records.CategoryId = Categories.id ${query} ORDER BY Records.date DESC`)

    rawRecords[0].forEach(element => {
      element.date = element.date.toISOString().split("T")[0]
    });
    console.log(rawRecords[0])
    let categoryList = await Category.findAll({
      order: [
        ['categoryName', 'ASC'],
      ],
    })

    let selectedCategory = await Category.findAll({
      where: {
        Id: req.query.category
      }
    })
    console.log('selectedCategory')
    console.log(selectedCategory)
    return res.render('index', { records: rawRecords[0], categoryList: categoryList, selectedCategory: selectedCategory[0] })
  } catch (e) {
    return res.status(422)
  }
})

module.exports = router