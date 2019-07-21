'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    date: DataTypes.DATE,
    category: DataTypes.STRING,
    name: DataTypes.STRING,
    amount: DataTypes.FLOAT
  }, {});
  Record.associate = function (models) {
    // associations can be defined here
    Record.belongsTo(models.Category)
    Record.belongsTo(models.User)
  };
  return Record;
};