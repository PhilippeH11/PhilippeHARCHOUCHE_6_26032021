# PhilippeHARCHOUCHE_6_26032021
"Piquante" Application de notation de sauce piquante by SoPekocko
# Installation :



**Cloner le repository.**

 Lancer la commande "NPM START" depuis le dossier "FRONTEND", puis se positionner sur le dossier "BACKEND" et taper la commande "NODEMON".
 - Laisser compiler le fronted jusqu'au message compiled successfully !
 - Pour la partie Backend attendre le message, de connection avec succès à mongoDB Atlas.
 - Rendez vous sur votre navigateur sur le port 4200, à l'adresse suivante : localhost:4200/

 



Modèle de données pour sauces

-   **_id**: _String_ — l'identifiant unique créé par MongoDB 
-   **userId**: _String_ — l'identifiant unique MongoDB de l'utilisateur qui a créé la sauce 
-   **name**: _String_ — nom de sauce
-   **manufacturer**: _String_ — Fabricant de la sauce 
-   **description**: _String_ — Description de la sauce
-   **mainPepper**: _String_ — les principaux ingrédients de la sauce
-   **imageUrl**: _String_ — l'URL de l'image de la sauce téléchargée par l'utilisateur
-   **heat**: _Number_ — nombre entre 1 et 10 décrivant la force de la sauce sur un slider
-   **likes**: _Number_ — nombre d'utilisateurs ayant disliké
-   **dislikes**: _Number_ — nombre d'utilisateurs qui n'aiment pas la sauce
-   **usersLiked**: _[String]_ — tableau d'identifiants d'utilisateurs ayant aimé la sauce 
-   **usersDisliked**: _[String]_ — tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce 

Modèle de données pour les utilisateurs

-   **email**: _String_ — the user's email address **[unique]** **[mongoose-unique-validator]**
-   **password**: _String_ — hash of the user's password **[encodé/Hash]**
