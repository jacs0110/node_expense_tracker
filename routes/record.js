const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const Category = db.Category
const User = db.User

// auth
const { authenticated } = require('../config/auth')

// list all expenses
router.get('/', authenticated, (req, res) => {
  // res.send('list all expense')
  res.render('index')
})

// create an new expense page
router.get('/new', authenticated, (req, res) => {
  Category.findAll({
    where: {
      UserId: req.user.id
    },
    order: [
      ['categoryName', 'ASC'],
    ],
  })
    .then((categories) => {
      res.render('new', { categories: categories })
    })

})

// create a new expense (action)
router.post('/', authenticated, (req, res) => {
  Record.create({
    date: req.body.date,
    CategoryId: Number(req.body.category),
    name: req.body.name,
    amount: parseFloat(req.body.record),
    UserId: req.user.id
  })
    .then((record) => {
      return res.redirect('/')
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

// edit an expense page
router.get('/:id/edit', authenticated, async (req, res) => {

  let categoryList = await Category.findAll({
    where: {
      UserId: req.user.id
    },
    order: [
      ['categoryName', 'ASC'],
    ],
  })
  Record.findOne({
    where: {
      RecordId: Number(req.params.id),
      UserId: req.user.id
    }
  })
    .then((record) => {
      let date = record.date.toISOString().split("T")[0]
      return res.render('edit', { record: record, date: date, categories: categoryList })
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

// edit an expense (action)
router.put('/:id', authenticated, (req, res) => {
  Record.findOne({
    where: {
      RecordId: req.params.id,
      UserId: req.user.id
    }
  })
    .then((record) => {
      record.date = req.body.date
      record.CategoryId = Number(req.body.category)
      record.name = req.body.name
      record.amount = parseFloat(req.body.record)
      record.UserId = req.user.id
      return record.save()
    })
    .then((recrod) => {
      return res.redirect('/')
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

// delete an expense
router.delete('/:id/delete', authenticated, (req, res) => {
  Record.destroy({
    where: {
      RecordId: req.params.id,
      UserId: req.user.id
    }
  })
    .then(() => {
      return res.redirect('/')
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

module.exports = router