import jsonwebtoken from  'jsonwebtoken';

const User = require('../models').User;
const jwt = jsonwebtoken;
process.env.SECRET_KEY = 'mysecretkey';
const secret = process.env.SECRET_KEY;


module.exports = {
 
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
        status: true,
        feed: user,
      }))
      .catch(error => {
        //console.log(error);
        const err = error.errors[0].message || error;
        res.status(400).json({
          message: err + ", pls fill the field appropriately",
          status: false
        })
      });
  },

  signIn(req, res){
    if (req.email === null || req.password === null){
      res.status(400).send({
        message:'Both email and password are required, fill them accordingly',
        status: false,
      });
      return -1
    }  
    User
    .findOne({
      where: {email: req.email, password: req.password},
    })
    .then((user) =>{
      if (user){
        let userId = user.id;
        const token = jwt.sign({userId}, secret, {expiresIn: '60m'});
        res.status(200).send({
          feed: {
            "firstName": user.firstName,
            "id":user.id,
            "lastName":user.lastName,
            "email":user.email,
            "createdAt":user.createdAt,
            "updatedAt":user.updatedAt
          },
          token: token,
          message: "Successfully signed in",
          status: true,
        });
        return 0
      }
      res.status(400).send({
      message: "Authentication failed: Wrong email or password",
      status: false,
      });
      return -1
    })
    .catch(error => {
      const err = error.errors[0].message;
      res.status(400).send({
        message: err + " Pls fill in the field appropritely",
        status: false
      })
      return -1
    });
  },
  

};