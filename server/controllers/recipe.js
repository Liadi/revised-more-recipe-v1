const Recipe = require('../models').Recipe;
const Review = require('../models').Review;

module.exports = {
  addRecipe(req, res){
    Recipe
      .create({
      name: req.recipeName,
      ingredients: req.recipeIngredients,
      instruction: req.recipeInstruction,
      description: req.recipeDescription,
      userId: req.userId,
    })
    .then(recipe => {
      res.status(201).send({
        message: 'Recipe added',
        status: true,
        feed: recipe
      })
    })
    .catch(error => {
      const err = error.errors[0].message;
      res.status(406).send({
        message: err + ` Pls fill in the field appropriately`,
        status: false
      })
    });
  },

  
  modifyRecipe(req, res){
    Recipe
    .findOne(
      {where:{id: req.params.recipeId, userId: req.userId}}
    )
    .then( (recipe) => {
      const valName = req.body.recipeName || recipe.name;
      const valIngredients = req.body.recipeIngredients || recipe.ingredients;
      const valInstruction = req.body.recipeInstruction || recipe.instruction;
      const valDescription = req.body.recipeDescription || recipe.description;
      recipe
      .update(
        {
          name : valName,
          ingredients: valIngredients,
          instruction: valInstruction,
          description: valDescription,
        },
        {where:{id: req.params.recipeId,}}
      )
      .then((recipe) => {
        res.status(200).send({
          message: recipe.name + ' recipe updated',
          status: true,
          feed: recipe,
        })
        return -1;
      })
      .catch(error => {
        const err = error.errors[0].message;
        res.status(400).send({
          message: err + ` Pls fill in the field appropriately`,
          status: false
        });
        return -1;
      });

    })
    .catch(error => 
      {
        //console.log('You\'re trying to modify a recipe that doesn\'t exist')
        res.status(404).send({
          message: `You don't have any such recipe`,
          status: false
        });
      });

  },
  

  //logged in user should be able to delete added recipes
  deleteRecipe(req, res){
    Recipe
    .findOne({
      where:{id: req.params.recipeId, userId: req.userId}
    })
    .then(recipe => {
      if (!recipe){
        res.status(404).send({
          message: `You don't have any such recipe`,
          status: false
        });
      }
      else{
        let tempName = recipe.name
        recipe.destroy();
        res.status(202).send({
          message: tempName + ' recipe deleted',
          status: true,
        });
      }
    })
    
    
  },

  getAllRecipes(req, res){
    if (req.query.sort && req.query.order){

      if (req.query.sort === 'upvotes' && req.query.order === 'descending'){
        return Recipe
        .findAll({
            order: [
                ['upVote', 'DESC'],
                ['downVote', 'ASC'],
                ['name', 'ASC'],
            ],
            attributes: ['name', 'upVote', 'downVote'],
          })
        .then(recipes => {
          if (recipes === null){
            res.status(200).send({
                message: 'No recipe',
                status: true,
            });
          }
          res.status(200).send({
            message: 'all recipes soted by upvotes',
            status: true,
            feed: recipes,
          });
        })
      }
    }
    
    Recipe
    .findAll()
    .then(recipes => {
      if (recipes.length === 0){
        res.status(404).send({
          message:`We presently don't have any recipe in our repository, You could add to it`,
          status: false,
        });
        return -1;
      }
      else{
        res.status(200).send({
          message: 'All recipes found',
          status: true,
          feed: recipes,
        });
        return 0;
      }
    })
    .catch(error => {
      const err = error.errors[0].message;
      res.status(400).send({
        message: err + `, Pls fill in the field appropriately`,
        status: false
      });
    });
  },


  postRecipeReview(req, res){
    Recipe
    .findOne(
      {where:{id: req.params.recipeId}}
    )
    .then(recipe => {
      req.recipe = recipe;
      if (recipe === null){
        return res.status(404).send({
          message: `That recipe doesn't exist`,
          status: false
        });
        return -1;
      }
      Review
      .create(
        {
          userId: req.userId,
          recipeId: req.params.recipeId,
          content: req.body.reviewContent
        }
      )
      .then(recipe => 
        {res.status(202).send(
          {
            message: req.recipe.name + ' recipe created',
            status: true,
            feed: recipe,
          });
      })
      .catch(error => {
        const err = error.errors[0].message;
        res.status(400).send({
          message: err + ', Pls fill in the field appropriately',
          status: false
       });
      });
    })
    //server error
    //.catch(err => res.status(400).send('There is something wrong'));
  },

};