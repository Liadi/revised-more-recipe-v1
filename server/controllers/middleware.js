const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;


module.exports = {
 
  trimData(req, res, next){
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
      
      req.recipeId = req.params.recipeId;
      req.state = (req.headers.state && req.headers.state.trim()) || null;

      if (req.state !== null){
        if (req.state === "0" || req.state === "1"){
          req.state = Boolean(Number(req.state));
        } 
        else{
          res.status(400).json({
            message: `faulty header parmeter, vote parameter is either "0" or "1"`,
            status: false
          })
          return -1
        }
      }
      req.state = req.state && Boolean(req.state);
     // req.userId = parseInt(req.params.userId)
      
      
    }
    catch(err){
      res.status(400).json({
        message: "Pls fill the fields appropriately, You'd probably sent multiple entries for a field",
        status: false
      })
      return -1
    } 
    next();
  },

  ensureFound(req, res, next){
    req.token = req.body.token || req.headers.token;
    if (!req.token){
      res.status(401).send({
        message: `You only have access, if you're logged in`,
        status: false,
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
        status: false,
      });
    }
    console.log(verifiedJWT);
    //console.log(verifiedJWT.user);
    if (!verifiedJWT.userId){
      res.status(400).send({
        message: 'Pls Login into your account or sign up',
        satus: false,
      });
      return -1;
    }
    else{
      req.userId = verifiedJWT.userId;
      next();
    }
  },

}