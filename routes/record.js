const express = require('express')
const router = express.Router()
const db = require('../models')
// const Expense = db.Expense
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

// show an expense page
router.get('/:id', (req, res) => {
  res.send(`show an expense page: ${req.params.id}`)
})

// create a new expense (action)
router.post('/', (req, res) => {
  res.send('create a new expense (action)')
})

// edit an expense page
router.get('/:id/edit', (req, res) => {
  res.render('edit')
})

// edit an expense (action)
router.post('/:id', (req, res) => {
  res.send(`edit an expense page: ${req.params.id}`)
})

// delete an expense
router.post('/:id/delete', (req, res) => {
  res.send(`delete an expense page: ${req.params.id}`)
})

module.exports = router