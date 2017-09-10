import {ensureSameUser, ensureFound, addRecipe, signUp, trimData, signIn} from '../controllers/user';
import {modifyRecipe, deleteRecipe, getAllRecipes, postRecipeReview} from '../controllers/user';
import {makeFavouriteRecipe, userFavouriteRecipes, sortRecipeByVotes, userVote} from '../controllers/user';
import {recipes} from '../controllers';
import jsonwebtoken from  'jsonwebtoken';
import app from '../../app';


const jwt = jsonwebtoken;
process.env.SECRET_KEY = 'mysecretkey';

module.exports = (app) => {
  app.get('/api/v1', (req, res) => {
    res.status(200).json({
      message: 'Welcome to More Recipe',
      status: 'successful',
    });
  });
  
  app.post('/api/v1/users/signup', trimData, signUp);

  app.post('/api/v1/users/signin', trimData, signIn);
  
  app.post('/api/v1/recipes', trimData, ensureFound, ensureSameUser, addRecipe);
  
  app.put('/api/v1/recipes/:recipeId', trimData, ensureFound, ensureSameUser, modifyRecipe);

  app.delete('/api/v1/recipes/:recipeId', ensureFound, ensureSameUser, deleteRecipe);

  app.get('/api/v1/recipes', ensureFound, ensureSameUser, getAllRecipes);

  app.post('/api/v1/recipes/:recipeId/reviews', trimData, ensureFound, ensureSameUser, postRecipeReview);

  app.post('/api/v1/users/:recipeId/favourite', trimData, ensureFound, ensureSameUser, makeFavouriteRecipe);

  app.get('/api/v1/users/:userId/recipes', ensureFound, ensureSameUser, userFavouriteRecipes);
  
  app.post('/api/v1/recipes/:recipeId/vote', ensureFound, ensureSameUser, userVote);

  app.get('/api/v1/recipes/upvotes', ensureFound, ensureSameUser, sortRecipeByVotes);

};