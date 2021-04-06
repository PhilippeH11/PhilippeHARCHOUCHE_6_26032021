// Prérequis pour nos controleurs
const Sauce = require('../models/sauce');
//Filesystem ou système de fichiers
const fs = require('fs');

//Création d'un objet (Crud)
exports.createSauce = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    const sauces = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + "/images/" + req.file.filename,
        heat: req.body.sauce.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauces.save().then(
        () => {
            res.status(201).json({
                message: 'Sauce ajoutée!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error : error
            });
        }
    );
}
// Sélection individuelle d'un objet (cRud)
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id : req.params.id
        
    }).then(
        (sauce) => {
            res.status(200).json(sauce)
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error : error
            });
        }
    );
}
//Modification de l'objet (crUd)
exports.modifySauce = (req, res, next) => {
    let sauces = new Sauce({_id : req.params._id});
    if (req.file){
        const url = req.protocol + '://' + req.get('host');
        req.body.sauce = JSON.parse(req.body.sauce);
        sauces = {
            userId: req.body.sauce.userId,
            name: req.body.sauce.name,
            manufacturer: req.body.sauce.manufacturer,
            description: req.body.sauce.description,
            mainPepper: req.body.sauce.mainPepper,
            imageUrl: url + "/images/" + req.file.filename,
            heat: req.body.sauce.heat
        };
    }else{
        sauces = {
            _id: req.params.id,
            userId: req.body.userId,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat
        };
    }
    Sauce.updateOne({_id: req.params.id}, sauces).then(
        () => {
            res.status(201).json({
                message : "Sauce successfully updated!"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error : error
            });
        }
    );
};

// Suppression de l'objet (cruD)
exports.deleteOneSauce = (req, res, next) => {
    Sauce.findOne({_id : req.params.id}).then(
        (sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Sauce.deleteOne({_id: req.params.id}).then(
                    () => {
                        res.status(200).json({
                            message : "Sauce deleted!"
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );
            });
        }
    );
}

// Possibilité de noter les sauces
exports.likes = (req, res, next) => {
    /* if user likes the sauce */
    if (req.body.like === 1){
        Sauce.findOne({_id : req.params.id}).then(
            (sauce) => {
    // l'utilisateur a deja liké
                if (!sauce.usersLiked.includes(req.body.userId)){
                    sauce.likes = sauce.likes + 1;
                    sauce.usersLiked.push(req.body.userId);
                    sauce.save().then(
                        () => {
                            res.status(201).json({
                                message : "l'utilisateur a liké une sauce"
                            });
                        }
                    ).catch(
                        (error) => {
                            error : error
                        }
                    );

                }else {
                    res.status(400).json(
                        (error) => {
                            error : error
                        }
                    );
                }
            }
        );
        //l'utilsateur a annulé un like ou un dislike
    } else if (req.body.like === 0){
        Sauce.findOne({_id : req.params.id}).then(
            (sauce) => {
                //Si l'utilisateur reclique sur un like il annule son précédent like
                if(sauce.usersLiked.includes(req.body.userId)){
                    sauce.usersLiked = sauce.usersLiked.filter(user => user !== req.body.userId);
                    sauce.likes = sauce.likes - 1;
                    sauce.save().then(
                        () => {
                            res.status(201).json({
                                message : "l'utilisateur a annulé nson précédent like"
                            });
                        }
                    ).catch (
                        (error) => {
                            res.status(400).json({
                                error : error
                            });
                        }
                    );
                } else {
                   //si l'utilisateur reclique sur un dislike il annule le précédent
                    sauce.usersDisliked = sauce.usersDisliked.filter(user => user !== req.body.userId);
                    sauce.dislikes = sauce.dislikes - 1;
                    sauce.save().then(
                        () => {
                            res.status(201).json({
                                message : "l'utilisateur a annulé nson précédent dislike"
                            });
                        }
                    ).catch(
                        (error) => {
                            res.status(400).json({
                                error : error
                            });
                        }
                    );
                }
            }
        );
        // l'utilisateru dislike la sauce 
    } else {
        Sauce.findOne({_id : req.params.id}).then(
            (sauce) => {
                if(!sauce.usersDisliked.includes(req.body.userId)){
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.dislikes = sauce.dislikes + 1;
                    sauce.save().then(
                        () => {
                            res.status(201).json({
                                message : "l'utilisateur dislike la sauce"
                            });
                        }
                    ).catch(
                        (error) => {
                            res.status(400).json({
                                error : error
                            });
                        }
                    );
                } else {
                    res.status(400).json({
                        error : error
                    });
                }

            }
        );

    }
}

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}


