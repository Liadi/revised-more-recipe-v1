module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        is: {
          args: ["^[a-z]+$",'i'],
          msg: 'Your name should be letters only',
        },
        len:{
          args: 2,
          msg: 'Your name should be at least of length 2. Remember you also can\'t have initials',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is: {
          args: ["^[a-z]+$",'i'],
          msg: 'Your name should be letters only',
        },
        len:{
          args: 2,
          msg: 'Your name should be at least of length 2. Remember you also can\'t have initials',
        },
      }, 
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail:{
          args: true,
          msg: 'Pls input an appropriate email, e.g abc@andela.com',
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: {
          args: 6,
          msg: 'Password should have minimum of 6 characters'
        },
      },
    },
  });

  User.associate = (models) => {
    
    User.hasMany(models.Recipe,{
      foreignKey: "userId",
      as: 'Recipes'
    });

    User.hasMany(models.Favourite,{
      foreignKey: "userId",
      as: 'Favourites',
    });

    User.hasMany(models.Review,{
      foreignKey: "UserId",
      as: 'Reviews',
    });

    User.hasMany(models.Vote,{
      foreignKey: "UserId",
      as: 'Votes'
    });


  };
  return User;
};