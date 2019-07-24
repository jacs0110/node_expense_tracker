const express = require('express')
const router = express.Router()
const db = require('../models')
// const User = db.User
const Record = db.Record
const Category = db.Category

// auth
const { authenticated } = require('../config/auth')

router.get('/', authenticated, async (req, res) => {
  let queryCategory = ""
  let queryMonth = ""
  let selectedMonth = ""

  let queryUser = `WHERE "Records"."UserId"=${req.user.id}`
  console.log(queryUser)

  // process query
  // switch (req.query.category.toString()) {
  //   case "all":
  //     queryCategory = ""
  //     break;
  //   case "none":
  //     queryCategory = ""
  //     break;
  //   default:
  //     queryCategory = `AND "Categories"."id" = ${req.query.category}`
  // }
  console.log(req.query)
  console.log(typeof req.query.category)

  if (req.query.category.toString() !== 'all' && req.query.category.toString() !== 'none') {
    queryCategory = `AND "Categories"."id" = ${req.query.category}`
  } else {
    queryCategory = ""
  }

  if (req.query.month == "all") {
    queryMonth = ""
  } else {
    let year = req.query.month.split('-')[0]
    let month = req.query.month.split('-')[1]
    queryMonth = `AND year("Records"."date")=${year} AND month("Records"."date")=${month}`
    selectedMonth = `${year}-${month}`
  }

  try {
    // query records
    let rawRecords = await db.sequelize.query(`SELECT "Records"."id","Records"."date","Records"."name","Records"."amount","Records"."CategoryId", "Categories"."categoryName","Categories"."icon" FROM "Records" JOIN "Categories" ON "Records"."CategoryId" = "Categories"."id" ${queryUser} ${queryCategory} ${queryMonth}  ORDER BY "Records"."date" DESC`)

    rawRecords[0].forEach(element => {
      element.date = element.date.toISOString().split("T")[0]
    });

    // query total amounts
    let totalAmount = await db.sequelize.query(`SELECT SUM("Records"."amount") as "sum" FROM "Records" JOIN "Categories" ON "Records"."CategoryId" = "Categories"."id" ${queryUser} ${queryCategory} ${queryMonth}`)

    // query category list
    let categoryList = await Category.findAll({
      where: {
        UserId: req.user.id
      },
      order: [
        ['categoryName', 'ASC'],
      ],
    })

    let selectedCategory = await Category.findAll({
      where: {
        id: req.query.category,
        UserId: req.user.id
      }
    })

    //query month list
    let rawMonths = await db.sequelize.query(`SELECT "Records"."date" FROM "Records" ${queryUser} GROUP BY "Records"."date" ORDER BY "Records"."date" DESC`)

    rawMonths[0].forEach(element => {
      let year = element.date.toISOString().split("-")[0]
      let month = element.date.toISOString().split("-")[1]
      element.date = `${year}-${month}`
    });

    const monthList = [... new Set(rawMonths[0].map(x => x.date))]

    return res.render('index', { records: rawRecords[0], categoryList: categoryList, selectedCategory: selectedCategory[0], totalAmount: totalAmount[0][0], monthList: monthList, selectedMonth })
  } catch (e) {
    return res.status(422)
  }
})

module.exports = router