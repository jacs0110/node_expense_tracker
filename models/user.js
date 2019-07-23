'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Record, {
      foreignKey: 'UserId',
    });
    User.hasMany(models.Category, {
      foreignKey: 'UserId',
    });
  };
  return User;
};