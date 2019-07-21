const db = require('../models')
const Record = db.Record
const Category = db.Category

// let test = db.sequelize.query('SELECT Categories.name, Records.id, Records.date FROM Records JOIN Categories ON Records.CategoryId = Categories.id')

// console.log(test[0])

// module.exports