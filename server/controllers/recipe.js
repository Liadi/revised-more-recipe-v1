const Recipe = require('../models').recipe;

module.exports = {
  create(req, res) {
    return Recipe
      .create({
        name: req.body.firstName,
        ingredients: req.body.lastName,
        instruction: req.body.email,
        description: req.body.password,
      })
      .then(recipe => res.status(201).send(recipe))
      .catch(error => res.status(400).send(error));
  },
};