const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);

app.get('*', (req, res) => 
{
    res.status(404).json(
    {
      message: 'Ooops! Something went wrong. try navigating from home page or log in',
      status: 'failed',

    })
});

// app.post('*', (req, res) => 
// {
//     res.status(404).json(
//     {
//         message: `Ooops! your request couldn't be processed you should 
//         return to the home page or log in`,
//         status: 'successful',
//     })
// });

app.delete('*', (req, res) => 
{
    res.status(404).json(
    {
        message: `Ooops! your request couldn't be processed you should 
        return to the home page or log in`,
        status: 'successful',
    })
});

app.put('*', (req, res) => 
{
    res.status(404).json(
    {
        message: `Ooops! your request couldn't be processed you should 
        return to the home page or log in`,
        status: 'successful',
    })
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Abyss!',
// }));




module.exports = app;