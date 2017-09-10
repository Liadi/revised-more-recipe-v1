module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    content: {
      type: DataTypes.STRING,
      validate: {
        is:{
          args: ['^\\W*(?:\\w+\\b\\W*){2,500}$','i'],
          msg: 'Your content should be between 2 and 500 words',
        }
      },
    },
  });
      Review.associate = (models) => {
        // associations can be defined here
        Review.belongsTo(models.User,{
          foreignKey: 'userId',
          onDelete:'CASCADE',
        });    

        Review.belongsTo(models.Recipe,{
          foreignKey: 'recipeId',
          onDelete:'CASCADE',
        });
  };
  return Review;
};

