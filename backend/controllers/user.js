// Prérequis
const User = require('../models/user');
//BCRYPT 
const bcrypt = require('bcrypt');
const pwdValidator = require("password-validator");
const jwt = require('jsonwebtoken');

//Exiger un mot de passe complexe
let pwd = new pwdValidator();
pwd
.is().min(8) // minimum 8 caractères
.is().max(25) // maximum 25 caractères
.has().uppercase() // une majuscule
.has().lowercase() // une minuscule
.has().not().spaces() // pas d'espaces
.has().digits() // un chiffre*/

// Enregistrement d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  if (!pwd.validate(req.body.password)) {
    return res.status(400).json({error: "1maj 1min 1chiffre minimu 8car max 25car!"})
} else {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({email: req.body.email, password: hash})
        
        user.save()
            .then(() => res.status(201).json({ message: 'Signup : Utilisateur créé avec succès !' }))
            .catch(error => res.status(400).json({ error }));
        })
    .catch(error => res.status(500).json({ error }));
}
};


exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('Utilisateur introuvable !')
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Mot de passe incorrect!')
            });
          }
          // On fixe un délai d'expiration pour un token JWT au moment de sa signature, ici 24H.
          const token = jwt.sign(
            { userId: user._id },
            'NEW_RANDOM_TOKEN',
            { expiresIn: '24h' });
          res.status(200).json({
            userId: user._id,
            token: token
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
}