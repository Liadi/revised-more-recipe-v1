module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

  });
      Vote.associate = (models) => {
        // associations can be defined here
        Vote.belongsTo(models.User,{
          foreignKey: 'userId',
          onDelete:'CASCADE',
        });    

        Vote.belongsTo(models.Recipe,{
          foreignKey: 'recipeId',
          onDelete:'CASCADE',
        });
  };
  return Vote;
};

