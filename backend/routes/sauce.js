const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const sauceCtrl = require('../controllers/sauce');

const multer = require('../middleware/multer-config');
/* need to add auth below before multer  l’authentification est renforcée sur les routes requises ; */
router.post('/',auth, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id',auth, sauceCtrl.getOneSauce);
router.put('/:id',auth, multer, sauceCtrl.modifySauce);
router.delete('/:id',auth, sauceCtrl.deleteOneSauce);
router.post('/:id/like',auth, sauceCtrl.likes);

module.exports = router;