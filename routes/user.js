const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

// login
router.get('/login', (req, res) => {
  res.render('login')
})

// login check
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })(req, res, next)
})

// register
router.get('/register', (req, res) => {
  res.render('register')
})

// register check
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body

  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: 'All fields are required' })
  }

  if (password !== password2) {
    errors.push({ message: 'Two password are inconsistant' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        console.log('User already exists')
        errors.push({ message: 'This user has been registered, please use another email' })
        res.render('register', {
          errors,
          name,
          password,
          password2
        })
      } else if (password === password2) {
        const newUser = new User({
          name,
          email,
          password,
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash

            newUser
              .save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => console.log(err))
          })
        })
      } else {
        console.log('Password inconsistent')
        res.render('register', {
          name,
          email,
        })
      }
    })
  }
})

// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Log out successfully, see you next time!')
  res.redirect('/users/login')
})

module.exports = router