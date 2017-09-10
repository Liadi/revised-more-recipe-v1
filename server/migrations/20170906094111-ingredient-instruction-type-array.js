'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.changeColumn(
      'Recipes',
      'ingredients',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
      }
    )

    queryInterface.changeColumn(
      'Recipes',
      'instruction',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
      }
    )

    queryInterface.changeColumn(
      'Votes',
      'state',
      {
        type: Sequelize.ENUM('upVote', 'downVote'),
      }
    )



  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.changeColumn(
      'Recipes',
      'ingredients',
      {
        type: Sequelize.STRING,
      }
    )

    queryInterface.changeColumn(
      'Recipes',
      'instruction',
      {
        type: Sequelize.STRING,
      }
    )
    queryInterface.changeColumn(
      'Votes',
      'state',
      {
        type: Sequelize.BOOLEAN,
      }
    )

  }
};
