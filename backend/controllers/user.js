// Prérequis
const User = require('../models/user');
//BCRYPT voir PPT
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Enregistrement d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save().then(
          () => {
            res.status(201).json({
              message: 'Utilisateur ajouté !'
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
    );
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