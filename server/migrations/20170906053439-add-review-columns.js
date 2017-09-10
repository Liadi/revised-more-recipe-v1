
module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn('Reviews','userId',{
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    queryInterface.addColumn('Reviews','recipeId',{
      type: Sequelize.INTEGER,
      allowNull: false,
    });
      
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Reviews', 'userId');
    queryInterface.removeColumn('Reviews', 'recipeId');
  }
};
