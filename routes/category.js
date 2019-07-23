const express = require('express')
const router = express.Router()
const db = require('../models')
const Category = db.Category
const User = db.User

// auth
const { authenticated } = require('../config/auth')

// get all categories
router.get('/', authenticated, async (req, res) => {

  let categories = await Category.findAll({
    where: { UserId: req.user.id },
    order: [
      ['categoryName', 'ASC'],
    ],
  })
  return res.render('category_index', { categories: categories })
})

// create a new category (action)
router.post('/', authenticated, (req, res) => {
  console.log(req.body)
  let newIcon
  if (!req.body.icon) {
    newIcon = '<i class="fas fa-pen"></i>'
  }

  Category.create({
    categoryName: req.body.name,
    icon: req.body.icon,
    UserId: req.user.id
  })
    .then((category) => {
      req.flash('success_msg', `You created a new category successfully!`)
      return res.redirect('/categories')
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

// edit a category
router.get('/:id/edit', authenticated, (req, res) => {
  Category.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id
    }
  })
    .then((category) => {
      return res.render('category_index', { category: category })
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})
// edit a category (action)
router.put('/:id', authenticated, (req, res) => {
  Category.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id
    }
  })
    .then((category) => {
      category.categoryName = req.body.name
      category.icon = req.body.icon
      category.UserId = req.user.id
      return category.save()
    })
    .then(() => {
      return res.redirect('/categories')
    })
})

// delete a category
router.delete('/:id/delete', authenticated, async (req, res) => {

  let queryUser = `WHERE "Records"."UserId"=${req.user.id}`
  let queryCategory = `AND "Categories"."id"=${req.params.id}`

  let counts = await db.sequelize.query(`SELECT "Categories"."id",COUNT("Records"."name") as "count" FROM "Records" JOIN "Categories" ON "Records"."CategoryId" = "Categories"."id" ${queryUser} ${queryCategory} GROUP BY "Categories"."id"`)

  if (typeof (counts[0][0]) == "undefined") {
    Category.destroy({
      where: {
        Id: req.params.id,
        UserId: req.user.id
      }
    })
      .then(() => {
        req.flash('success_msg', `You deleted a category successfully!`)
        return res.redirect('/categories')
      })
      .catch((error) => {
        return res.status(422).json(error)
      })
  } else {
    req.flash('warning_msg', `You can't delete this category because there are ${counts[0][0].count} record in it!`)
    return res.redirect('/categories')
  }
})
module.exports = router