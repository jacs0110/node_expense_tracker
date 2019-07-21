'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Categories', 'name', 'categoryName');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Categories', 'categoryName', 'name');
  }
};
