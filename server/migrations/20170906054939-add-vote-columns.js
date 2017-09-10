
module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn('Votes','userId',{
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    queryInterface.addColumn('Votes','recipeId',{
      type: Sequelize.INTEGER,
      allowNull: false,
    });
      
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Votes', 'userId');
    queryInterface.removeColumn('Votes', 'recipeId');
  }
};
