const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
// const User = dn.User

// auth

// list all expenses
router.get('/', (req, res) => {
  // res.send('list all expense')
  res.render('index')
})

// create an new expense page
router.get('/new', (req, res) => {
  res.render('new')
})

// create a new expense (action)
router.post('/', (req, res) => {
  Record.create({
    date: req.body.date,
    category: req.body.category,
    name: req.body.name,
    amount: parseFloat(req.body.record),
  })
    .then((record) => {
      return res.redirect('/')
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

// edit an expense page
router.get('/:id/edit', (req, res) => {
  Record.findOne({
    where: {
      Id: req.params.id
    }
  })
    .then((record) => {
      return res.render('edit', { record: record })
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

// edit an expense (action)
router.put('/:id', (req, res) => {
  Record.findOne({
    where: {
      Id: req.params.id
    }
  })
    .then((record) => {
      console.log('req.body')
      console.log(req.body)
      record.date = req.body.date
      record.category = req.body.category
      record.name = req.body.name
      record.amount = parseFloat(req.body.record)
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
router.delete('/:id/delete', (req, res) => {
  Record.destroy({
    where: {
      Id: req.params.id
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