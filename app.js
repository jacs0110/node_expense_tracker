// import modules
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// include static files
app.use(express.static('public'))

// connect to db
const db = require('./models')
const Record = db.Record
// const User = db.User


// set up the app
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(flash())

// use express session
app.use(session({
  secret: 'akpitd',
  resave: 'false',
  saveUninitialized: 'false'
}))

// use passport
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

// locals
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// routes
app.use('/', require('./routes/home.js'))
app.use('/users', require('./routes/user.js'))
app.use('/records', require('./routes/record.js'))
app.use('/sorts', require('./routes/sortByCategory.js'))
app.use('/categories', require('./routes/category.js'))
app.use('/auth', require('./routes/auth.js'))

// listen to the express app
app.listen(port, () => {
  console.log(`Listening to express app...`)
})