// import modules
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const port = 3000

// include static files
app.use(express.static('public'))

// connect to db
const db = require('./models')
// const User = db.User
// const Expense = db.Expense

// set up the app
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

// use express session
app.use(session({
  secret: 'akpitd',
  resave: 'false',
  saveUninitialized: 'false'
}))

// use passport
// app.use(passport.initialize())
// app.use(passport.session())
// require('./config/passport')(passport)

// locals

// routes
app.use('/', require('./routes/home.js'))
app.use('/users', require('./routes/user.js'))
app.use('/records', require('./routes/record.js'))

// listen to the express app
app.listen(port, () => {
  console.log(`Listening to express app...`)
})