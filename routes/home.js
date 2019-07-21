const express = require('express')
const router = express.Router()
const db = require('../models')
// const User = db.User
const Record = db.Record
const Category = db.Category

const { authenticated } = require('../config/auth')

router.get('/', authenticated, async (req, res) => {
  console.log(`welcome to home page, user ${req.user.id}`)
  try {

    let queryUser = `WHERE Records.UserId=${req.user.id}`
    console.log(queryUser)

    // query records
    let rawRecords = await db.sequelize.query(`SELECT Records.id,Records.date,Records.name,Records.amount,Records.CategoryId, Categories.categoryName,Categories.icon FROM Records JOIN Categories ON Records.CategoryId = Categories.id ${queryUser} ORDER BY Records.date DESC`)

    rawRecords[0].forEach(element => {
      element.date = element.date.toISOString().split("T")[0]
    });

    // query category list
    let categoryList = await Category.findAll({
      where: { UserId: req.user.id },
      order: [
        ['categoryName', 'ASC'],
      ],
    })

    //query month list
    let rawMonths = await db.sequelize.query(`SELECT Records.date FROM Records ${queryUser} GROUP BY Records.date ORDER BY Records.date DESC`)

    rawMonths[0].forEach(element => {
      let year = element.date.toISOString().split("-")[0]
      let month = element.date.toISOString().split("-")[1]
      element.date = `${year}-${month}`
    });

    const monthList = [... new Set(rawMonths[0].map(x => x.date))]

    //query total amount
    let totalAmount = await db.sequelize.query(`SELECT SUM(Records.amount) as sum FROM Records JOIN Categories ON Records.CategoryId = Categories.id ${queryUser}`)

    return res.render('index', { records: rawRecords[0], categoryList: categoryList, totalAmount: totalAmount[0][0], monthList: monthList })
  } catch (e) {
    return res.status(422)
  }
})

module.exports = router