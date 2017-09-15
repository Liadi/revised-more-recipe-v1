const Recipe = require('../models').Recipe;
const Favourite = require('../models').Favourite;

module.exports = {
    makeFavouriteRecipe(req, res){
        Recipe
        .findOne({
          where:{id:req.params.recipeId}
        })
        .then(recipe =>{
          if (recipe === null){
            res.status(404).send({
              message: `The recipe you're trying to make as favourite doesn't exist`,
              status: 'failed',
            });
            return -1;
          }
          Favourite
          .findOne({
            where: {recipeId: req.recipeId, userId: req.userId}
          })
          .then(favourite =>{
            if (favourite){
              res.status(200).send({
                message: `The recipe was already a favourite of yours`,
                status: 'successful',
              });
              return -1;
            }
            Favourite
            .create({
              userId: req.userId,
              recipeId: req.recipeId
            })
            .then(favourite => {
              res.status(200).send({
                message: 'you have made this recipe your favourite',
                status: 'successful',
                feed: favourite,
              })
            })
            .catch(error => {
              const err = error.errors[0].message;
              res.status(400).send({
                message: err + ", Pls fill in the field appropriately",
                status: 'failed'
              });
            });
          })
        })
        
        
      },
    
    
      userFavouriteRecipes(req, res){
        Favourite
        .findAll(
          {where:{userId:req.params.userId}, include:[{model: Recipe}]}
        )
        .then(favourite => {
          if (favourite.length === 0){
            res.status(404).send({
              message: `You don't have a favourite recipe`,
              status: 'failed',
            });
          }
          else{
            res.status(200).send({
              message: "Recipe added as favourite",
              status: 'successful',
              feed: favourite,
            })
          }
        })      
      },
    
}