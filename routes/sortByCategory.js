const express = require('express')
const router = express.Router()
const db = require('../models')
// const User = db.User
const Record = db.Record
const Category = db.Category

router.get('/:id', async (req, res) => {

  try {
    let rawRecords = await db.sequelize.query(`SELECT Records.id,Records.date,Records.name,Records.amount,Records.CategoryId, Categories.categoryName,Categories.icon FROM Records JOIN Categories ON Records.CategoryId = Categories.id WHERE Categories.id = ${req.params.id} ORDER BY Records.date DESC`)

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
        Id: req.params.id
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