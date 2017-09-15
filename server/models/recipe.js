module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      valdate: {
        len :{
          args: [2,20],
          msg: 'The name of the recipe should be at least of length 2 and at most length 20',
        }

      },
    },

    ingredients: 
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        //length zero would be handled in the controller
        len :{
          args: [1,],
          msg: 'The ingredient list is too long, make it at most --.\nYou can go to the help page for more'
        },
      }
    },

    instruction: 
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        //length zero would be handled in the controller
        len :{
          args: [1,],
          msg: 'The instruction list is too long, make it at most ----.\nYou can go to the help page for more'
        },
      }
    }, 

    description: 
    {
      type: DataTypes.STRING,

    },  
    upVote: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downVote:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  });
  Recipe.associate =  (models) => {
    Recipe.belongsTo(models.User,{
      foreignKey: "userId",
      onDelete:'CASCADE',
    });
    
    Recipe.hasMany(models.Favourite,{
      foreignKey: "recipeId",
      as: 'Favourites',
    });

    Recipe.hasMany(models.Review,{
      foreignKey: "recipeId",
      as: 'Reviews',
    });

    Recipe.hasMany(models.Vote,{
      foreignKey: "recipeId",
      as: 'Votes'
    });


  };
  return Recipe;
};