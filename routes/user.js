const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../models')
// const User = db.User

// login
router.get('/login', (req, res) => {
  res.render('login')
})

// login check
router.get('/login', (req, res, next) => {
  res.send('login')
})

// register
router.get('/register', (req, res) => {
  res.render('register')
})

// register check
router.get('/register', (req, res) => {
  res.send('register')
})

// logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router