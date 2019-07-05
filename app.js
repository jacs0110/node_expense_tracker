// import modules
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const mongosse = require('mongoose')

const port = 3000

// include static files
app.use(express.static('public'))

// set up the app
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

// connect to db

// routes
app.get('/', (req, res) => {
  res.render('index')
})

// listen to the express app
app.listen(port, () => {
  console.log(`Listening to express app...`)
})