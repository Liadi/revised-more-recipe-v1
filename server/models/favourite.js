'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    //empty initial attributes
    userId: 
    {
      type: DataTypes.INTEGER,
    },
    recipeId:
    {
      type: DataTypes.INTEGER,
    }

  });
      Favourite.associate = (models) => {
        // associations can be defined here
        Favourite.belongsTo(models.User,{
          foreignKey: 'userId',
          onDelete:'CASCADE',
        });    

        Favourite.belongsTo(models.Recipe,{
          foreignKey: 'recipeId',
          onDelete:'CASCADE',
        });
  };
  return Favourite;
};