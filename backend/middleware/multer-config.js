// Middleware de gestion des fichiers entrants (Uploads)
const multer = require('multer');
const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Constante Storage comme configuration de stockage des uploads
// Fonction filename pour le nom d'origine, remplacer les espaces par des underscores et ajouter un timestamp Date.now() comme nom de fichier
//Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée ;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images');
    },
    filename: function (req, file, cb) {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
      cb(null, name + Date.now() + '.' + extension);
    }
  });
  
module.exports = multer({ storage: storage }).single('image');