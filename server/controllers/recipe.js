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
        status: 'successful',
        feed: recipe
      })
    })
    .catch(error => {
      const err = error.errors[0].message;
      res.status(406).send({
        message: err + " Pls fill in the field appropriately",
        status: "failed"
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
          status: 'successful',
          feed: recipe,
        })
        return -1;
      })
      .catch(error => {
        const err = error.errors[0].message;
        res.status(400).send({
          message: err + " Pls fill in the field appropriately",
          status: 'failed'
        });
        return -1;
      });

    })
    .catch(error => 
      {
        //console.log('You\'re trying to modify a recipe that doesn\'t exist')
        res.status(404).send({
          message: `You don't have any such recipe`,
          status: 'failed'
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
          status: 'failed'
        });
      }
      else{
        let tempName = recipe.name
        recipe.destroy();
        res.status(202).send({
          message: tempName + ' recipe deleted',
          status: 'successful',
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
                status: 'success',
            });
          }
          res.status(200).send({
            message: 'Recipes soted by upvotes',
            status: 'success',
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
          status: 'failed',
        });
        return -1;
      }
      else{
        res.status(200).send({
          message: 'All recipes found',
          status: 'successful',
          feed: recipes,
        });
        return 0;
      }
    })
    .catch(error => {
      const err = error.errors[0].message;
      res.status(400).send({
        message: err + ", Pls fill in the field appropriately",
        status: 'failed'
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
          status: 'failed'
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
            message: req.recipe.name + " recipe created",
            status: 'successful',
            feed: recipe,
          });
      })
      .catch(error => {
        const err = error.errors[0].message;
        res.status(400).send({
          message: err + ", Pls fill in the field appropriately",
          status: 'failed'
       });
      });
    })
    //server error
    //.catch(err => res.status(400).send('There is something wrong'));
  },

};