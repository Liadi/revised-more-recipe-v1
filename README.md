# More Recipe

https://travis-ci.org/Liadi/revised-more-recipe-v1

More Recipe, A network of people committed to sharing recipes. A large repository of recipes
Explore recipes
Share recipes
Give and get feedback

-----------------------------------------------------
API(s) for CRUD on recipes
https://more-recipe-v1.herokuapp.com

-----------------------------------------------------
Language, Frameworks and Technologies
Node.js
Express
PostgreSQL
Sequelize
React and related libraries
Bootstrap


-----------------------------------------------------
  URL, method, route

  create a new user:
  url => post, /api/v1/users/signup
  
  user login:
  url => post, /api/v1/users/signin
  
  a logged in user creates a new recipe:
  url => post, /api/v1/recipes
  
  a logged in user modifies their recipe:
  url => put, /api/v1/recipes/:recipeId
  
  a logged in user deletes their recipe:
  url => delete, /api/v1/recipes/:recipeId
  
  a logged in user request for all recipe in database, can also sort by upvotes
  url => get, /api/v1/recipe

  a logged in user post a review on a recipe
  url => post, /api/v1/recipes/:recipeId/reviews 

  a logged in user makes a recipe their favourite
  url => get, /api/v1/users/:recipeId/favourite 

  a logged in user requests all their favourite recipe
  url => get, /api/v1/users/:userId/recipes 

  a logged in user votes a recipe
  url => get, /api/v1/recipes/:recipeId/vote

  recipe by upvote url
  url => get, /api/v1/recipes?sort=upvotes&order=descending  


  
-----------------------------------------------------
Front end (React)
Work in progress!
Checkout ./client (no pun intended)

Front end template in ./template
