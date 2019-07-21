const express = require('express')
const router = express.Router()
const db = require('../models')
const Category = db.Category
const User = db.User

// auth
const { authenticated } = require('../config/auth')

// get all categories
router.get('/', authenticated, (req, res) => {
  Category.findAll({
    where: {
      UserId: req.user.id
    },
    order: [
      ['categoryName', 'ASC']
    ]
  })
    .then((categories) => {
      return res.render('category_index', { categories: categories })
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
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
    icon: newIcon,
    UserId: req.user.id
  })
    .then((category) => {
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
router.delete('/:id/delete', authenticated, (req, res) => {
  Category.destroy({
    where: {
      Id: req.params.id,
      UserId: req.user.id
    }
  })
    .then(() => {
      return res.redirect('/categories')
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})
module.exports = router