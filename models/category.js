'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryName: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {});
  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.Record)
    Category.belongsTo(models.User)
  };
  return Category;
};