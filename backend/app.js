const express = require('express'); // Importation application Express
const bodyParser = require('body-parser'); // Importation le package body parser
const mongoose = require('mongoose'); // Importation le package Mongoose
const mongoSanitize = require('express-mongo-sanitize'); // Importation 
const helmet = require("helmet"); // Importation helmet
const sauceRoutes = require('./routes/sauce'); // Importation notre router sauce
const userRoutes = require('./routes/user'); // Importation notre router user
const path = require('path'); // pour donner accès au chemin de notre système de fichiers
require('dotenv').config();

mongoose.connect(process.env.DB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // pour accéder à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // pour ajouter les headers mentionnés aux requêtes envoyées vers l'API 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // pour envoyer des requêtes avec les méthodes mentionnées 
    next();
  });

app.use(bodyParser.json()); // pour transformer le corps de la requête en objet JS
app.use(mongoSanitize()); // pour chercher dans les req et supprimer toutes les clés commençant par $ ou contenant "."
app.use(helmet()); // pour sécuriser les en-têtes HTTP 
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes); // pour enregistrer le routeur pour toutes les demandes effectuées vers /api/sauces
app.use('/api/auth', userRoutes); // pour enregistrer le routeur pour toutes les demandes effectuées vers /api/auth
module.exports = app;

  