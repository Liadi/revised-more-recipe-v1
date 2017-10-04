import {signUp, signIn} from '../controllers/user';
import {ensureSameUser, ensureFound, trimData} from '../controllers/middleware';
import {addRecipe, modifyRecipe, deleteRecipe, getAllRecipes, postRecipeReview} from '../controllers/recipe';
import {makeFavouriteRecipe, userFavouriteRecipes} from '../controllers/favourite';
import {sortRecipeByVotes, userVote} from '../controllers/vote';

import app from '../../app';

module.exports = (app) => {
  app.get('/api/v1', (req, res) => {
    res.status(200).json({
      message: 'Welcome to More Recipe, This is version 1',
      status: true,
    });
  });

  app.get('/api', (req, res) => {
    res.status(200).json({
      message: 'Welcome to More Recipe',
      status: true,
    });
  });

  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Hello',
      status: true,
    });
  });
  
  //create a new user
  app.post('/api/v1/users/signup', trimData, signUp);

  //user login
  app.post('/api/v1/users/signin', trimData, signIn);
  
  //a logged in user creates a new recipe
  app.post('/api/v1/recipes', trimData, ensureFound, ensureSameUser, addRecipe);
  
  //a logged in user modifies their recipe
  app.put('/api/v1/recipes/:recipeId', trimData, ensureFound, ensureSameUser, modifyRecipe);

  //a logged in user deletes their recipe
  app.delete('/api/v1/recipes/:recipeId',trimData, ensureFound, ensureSameUser, deleteRecipe);

  //a logged in user request for all recipe in database, can also sort by upvotes
  app.get('/api/v1/recipes',trimData, ensureFound, ensureSameUser, getAllRecipes);

  //a logged in user post a review on a recipe
  app.post('/api/v1/recipes/:recipeId/reviews', trimData, ensureFound, ensureSameUser, postRecipeReview);

  //a logged in user makes a recipe their favourite
  app.get('/api/v1/users/:recipeId/favourite',trimData, ensureFound, ensureSameUser, makeFavouriteRecipe);

  //a logged in user requests all their favourite recipe
  app.get('/api/v1/users/:userId/recipes',trimData, ensureFound, ensureSameUser, userFavouriteRecipes);
  
  //a logged in user votes a recipe
  app.get('/api/v1/recipes/:recipeId/vote',trimData, ensureFound, ensureSameUser, userVote);

  // recipe by upvote format
  // api => get, /api/v1/recipes?sort=upvotes&order=descending 
  // middleware => trimData, ensureFound, ensureSameUser 
  // router => sortRecipeByVotes

};