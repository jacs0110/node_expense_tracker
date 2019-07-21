const express = require('express')
const router = express.Router()
const db = require('../models')
const Category = db.Category

// get all categories
router.get('/', (req, res) => {
  Category.findAll({
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
router.post('/', (req, res) => {
  console.log(req.body)
  Category.create({
    categoryName: req.body.name,
    icon: req.body.icon,
  })
    .then((category) => {
      return res.redirect('/categories')
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

// edit a category
router.get('/:id/edit', (req, res) => {
  Category.findOne({
    where: {
      Id: req.params.id
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
router.put('/:id', (req, res) => {
  Category.findOne({
    where: {
      Id: req.params.id
    }
  })
    .then((category) => {
      category.categoryName = req.body.name
      category.icon = req.body.icon
      return category.save()
    })
    .then(() => {
      return res.redirect('/categories')
    })
})

// delete a category
router.delete('/:id/delete', (req, res) => {
  Category.destroy({
    where: {
      Id: req.params.id
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