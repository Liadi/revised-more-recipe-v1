
module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn('Favourites','userId',{
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    queryInterface.addColumn('Favourites','recipeId',{
      type: Sequelize.INTEGER,
      allowNull: false,
    });
      
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Favourites', 'userId');
    queryInterface.removeColumn('Favourites', 'recipeId');
  }
};
