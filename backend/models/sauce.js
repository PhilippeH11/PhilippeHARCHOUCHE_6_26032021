//Prérequis
const mongoose = require("mongoose");

//Schema de sauce et type de données, (String, number etc) et si ils sont requis
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required:true},
    manufacturer: {type: String, required:true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required:true},
    dislikes: {type: Number, required: true},
    usersLiked: {type: [String], required: true},
    usersDisliked: {type: [String], required: true}
});

module.exports = mongoose.model('Sauce', sauceSchema);