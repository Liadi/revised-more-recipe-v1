const Recipe = require('../models').Recipe;
const Vote = require('../models').Vote;

module.exports = {
    userVote(req, res){
        Recipe
        .findOne({where:{id: req.params.recipeId}})
        .then(recipe => {
          if (recipe === null){
            res.status(404).send({
             message: `The recipe you're trying to vote doesn't exist`,
             status: false
            });
            return -1;
          }
          req.recipe = recipe;
          req.recipeId = req.params.recipeId;
        })
        
        Vote
        .findOne(
          {attributes: ['id', 'state', 'userId', 'recipeId']},
          {where:{userId: req.userId, recipeId: req.recipeId}})
        .then(vote => {
          if (vote !== null){
            //user has already voted this recipe
            req.vote = vote;
    
            if (vote.state === req.state){
              //making same vote which should result to a cancellation of that vote
              if (vote){
                req.recipe.update({upVote: req.recipe.getDataValue(`upVote`) - 1,},);
                res.status(200).send({
                  message: `Upvote undone`,
                  status: true
                });
              }
              else{
                req.recipe.update({downVote: req.recipe.getDataValue(`downVote`) - 1,},);
                res.status(200).send({
                  message: `Downvote undone`,
                  status: false
              });
              }
              vote.destroy();
    
            }
            else{
              //making a different vote on previously voted recipe
              vote.state = req.state
              if (req.state){
                //reduce recipe downvote and increse upvote
                req.recipe.update({upVote: req.recipe.getDataValue(`upVote`) + 1,},);
                req.recipe.update({downVote: req.recipe.getDataValue(`downVote`) - 1,},);          
            }
              else{
                //reduce recipe upvote and increse downvote
                req.recipe.update({upVote: req.recipe.getDataValue(`upVote`) - 1,},);
                req.recipe.update({downVote: req.recipe.getDataValue(`downVote`) + 1,},);
              }
              res.status(200).send({
                message: `Vote taken`,
                status: true,
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
              if (req.state){
                req.recipe.update({upVote: req.recipe.getDataValue(`upVote`) + 1,},);
              }
              else{
                req.recipe.update({downVote: req.recipe.getDataValue(`downVote`) + 1,},);
              }
    
              res.status(200).send({
                message: `Vote is created`,
                status: true,
                feed: vote
              })
            })
          }
        })
        
      },
      
}