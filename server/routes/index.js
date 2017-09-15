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
      status: 'successful',
    });
  });

  app.get('/api', (req, res) => {
    res.status(200).json({
      message: 'Welcome to More Recipe',
      status: 'successful',
    });
  });

  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Hello',
      status: 'successful',
    });
  });
  
  app.post('/api/v1/users/signup', trimData, signUp);

  app.post('/api/v1/users/signin', trimData, signIn);
  
  app.post('/api/v1/recipes', trimData, ensureFound, ensureSameUser, addRecipe);
  
  app.put('/api/v1/recipes/:recipeId', trimData, ensureFound, ensureSameUser, modifyRecipe);

  app.delete('/api/v1/recipes/:recipeId',trimData, ensureFound, ensureSameUser, deleteRecipe);

  app.get('/api/v1/recipes',trimData, ensureFound, ensureSameUser, getAllRecipes);

  app.post('/api/v1/recipes/:recipeId/reviews', trimData, ensureFound, ensureSameUser, postRecipeReview);

  app.get('/api/v1/users/:recipeId/favourite',trimData, ensureFound, ensureSameUser, makeFavouriteRecipe);

  app.get('/api/v1/users/:userId/recipes',trimData, ensureFound, ensureSameUser, userFavouriteRecipes);
  
  app.get('/api/v1/recipes/:recipeId/vote',trimData, ensureFound, ensureSameUser, userVote);

  //app.get('/api/v1/recipes?sort=upvotes&order=descending',trimData, ensureFound, ensureSameUser, sortRecipeByVotes);

};