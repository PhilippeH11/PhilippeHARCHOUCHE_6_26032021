// Prérequis
//Express contient la logique métier pour une ou plusieurs routes
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //* donne l'accès depuis n'importe quelle source
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
// Connection à mongoDB - MongoDB Atlas
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://PhilH11:qMZT0wcKZTUdxjzN@cluster0.ohchn.mongodb.net/myFirstDatabase?retryWrites=true')

.then(() => {
        console.log('Sucessfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.log(error); 
    });

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;

