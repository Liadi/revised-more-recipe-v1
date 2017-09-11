const User = require('../models').User;
const Recipe = require('../models').Recipe;
const Review = require('../models').Review;
const Favourite = require('../models').Favourite;
const jwt = require('jsonwebtoken');
const secret = 'secret';
const Vote = require('../models').Vote;


module.exports = {

  trimData(req, res, next){
    //console.log("fffffffffffffff"+( req.body.email[0]));
    try{
      req.lastName = (req.body.lastName && req.body.lastName.trim()) || null;
      req.email = (req.body.email && req.body.email.trim()) || null;
      req.password = (req.body.password && req.body.password.trim()) || null;
      req.firstName = (req.body.firstName && req.body.firstName.trim()) || null;

      req.recipeIngredients = ((req.body.recipeIngredients && req.body.recipeIngredients.trim()) || null) || ((req.headers.recipeIngredients && req.headers.recipeIngredients.trim()) || null);
      req.recipeDescription = ((req.body.recipeDescription && req.body.recipeDescription.trim()) || null) || ((req.headers.recipeDescription && req.headers.recipeDescription.trim()) || null);
      req.recipeName = ((req.body.recipeName && req.body.recipeName.trim()) || null)  || ((req.headers.recipeName && req.headers.recipeName.trim()) || null);
      req.recipeInstruction = ((req.body.recipeInstruction && req.body.recipeInstruction.trim()) || null) || ((req.headers.recipeInstruction && req.headers.recipeInstruction.trim()) || null);
      req.content = ((req.body.content && req.body.content.trim()) || null) || ((req.headers.content && req.headers.content.trim()) || null);
      
      req.recipeId = req.params.recipeId
     // req.userId = parseInt(req.params.userId)
      
      
    }
    catch(err){
      res.status(400).json({
        message: "Pls fill the fields appropriately, You'd probably sent multiple entries for a field",
        status: 'failed'
      })
      return -1
    } 
    next();
  },

 
  signUp(req, res) {
  
    User
      .create({
        firstName: req.firstName,
        lastName: req.lastName,
        email: req.email,
        password: req.password,
      })
      .then(user => res.status(201).json({
        message: 'User created',
        status: 'successful',
        feed: user,
      }))
      .catch(error => {
        const err = error.errors[0].message;
        res.status(400).json({
          message: err + ", pls fill the field appropriately",
          status: 'failed'
        })
      });
  },

  signIn(req, res){
    if (req.email === null || req.password === null){
      res.status(400).send({
        message:'Both email and password are required, fill them accordingly',
        status: 'failed',
      });
      return -1
    }  
    User
    .findOne({
      where: {email: req.email, password: req.password},
    })
    .then((user) =>{
      if (user){
        const token = jwt.sign({user}, secret, {expiresIn: '60m'});
        res.status(200).send({
          feed: user,
          token: token,
          message: "Successfully signed in",
          status: "successful",
        });
        return 0
      }
      res.status(400).send({
      message: "Authentication failed: Wrong email or password",
      status: "failed",
      });
      return -1
    })
    .catch(error => {
      const err = error.errors[0].message;
      res.status(400).send({
        message: err + " Pls fill in the field appropritely",
        status: "failed"
      })
      return -1
    });
  },

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

  ensureFound(req, res, next){
    req.token = req.body.token || req.headers.token;
    if (!req.token){
      res.status(401).send({
        message: `You only have access, if you're logged in`,
        status: 'failed',
      })
    }
    next();
  },

  ensureSameUser(req, res, next){
    let verifiedJWT;
    try {
      verifiedJWT = jwt.verify(req.token, secret);  
    } catch (err) {
      res.status(401).send({
        message: 'Pls login properly',
        status: 'failed',
      });
    }
    if (!verifiedJWT.user.id){
      res.status(400).send({
        message: 'Pls Login into your account or sign up',
        satus: 'failed',
      });
      return -1;
    }
    else{
      req.userId = verifiedJWT.user.id;
      next();
    }
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
      return recipe
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


  userVote(req, res){
    Recipe
    .findOne({where:{id: req.params.recipeId}})
    .then(recipe => {
      if (recipe === null){
        res.status(404).send({
         message: "The recipe you're trying to vote doesn't exist",
         status: "failed"
        });
        return -1;
      }
      req.recipe = recipe;
      req.recipeId = recipe.params.recipeId;
    })
    
    Vote
    .findOne({where:{userId: req.userId, recipeId: req.recipeId}})
    .then(vote => {
      if (vote !== null){
        //user has already voted this recipe
        req.vote = vote;

        if (vote.state === req.state){
          //making same vote which should result to a cancellation of that vote
          if (vote){
            req.recipe.upVote -= 1;
            res.status(200).send({
              message: "Upvote undone",
              status: "successful"
            });
          }
          else{
            req.recipe.downVote -= 1;
            res.status(200).send({
              message: "Downvote undone",
              status: "failed"
          });
          }
          vote.destroy();

        }
        else{
          //making a different vote on previously voted recipe
          vote.state = req.state
          if (req.state){
            //reduce recipe downvote and increse upvote
            req.recipe.upVote += 1 
            req.recipe.downVote -= 1
          }
          else{
            //reduce recipe upvote and increse downvote
            req.recipe.upVote -= 1 
            req.recipe.downVote += 1
          }
          res.status(200).send({
            message: "Vote taken",
            status: "successful",
          });

        }

      }
      else{
        Vote
        .create({
          state: req.state,
          userId: req.userId,
          recipeId: req.params.recipeId
        })
        .then(vote => {
          res.status(200).send({
            message: "Vote is created",
            status: "successful",
            feed: vote
          })
        })
      }
    })
    
  },

  // userDownVote(req, res){
  //   Recipe
  //   .findOne({where:{recipeId: req.params.recipeId}})
  //   .then(recipe => {
  //     if (recipe === null){
  //       res.status(400).send("The recipe you're trying to vote doesn't exist");
  //       return -1
  //     }
  //   })
  //   return Vote
  //   .findOne({where:{userId: req.userId, recipeId: req.params.recipeId}})
  //   .then(vote => {
  //     if (vote !== null){//user has already voted this recipe
  //       if (!(vote.state)){
  //         res.status(200).send("You've downvoted before, now downvote undone");
  //         vote.destroy()
  //         //you should reduce downvote of this recipe by 1 
  //         return 0
  //       }
  //       else{
  //         res.status(200).send("downvote done");
  //         req.state = true
  //         //you should increase downvote of this recipe by 1
  //         return Vote
  //         .create({
  //           state: req.state,
  //           userId: req.userId,
  //           recipeId: req.body.recipeId
  //         })      
  //       }

  //     }
  //   })
  // },

  
  sortRecipeByVotes(req, res){
    const dummyUser = 1
    return Vote
    .findAll({
      include: [{model: Recipe}]
      })
    .then(vote => {
      if (vote === null){
        res.status(200).send("no votes");
      }
      res.status(200).send(vote)
    })
    .catch(error => {
      const err = error.errors[0].message;
      res.status(400).send({
        message: err + ", Pls fill in the field appropriately",
        status: 'failed'
      });
    });
  },

};