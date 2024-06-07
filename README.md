![Sophie Bluel](https://user.oc-static.com/upload/2023/12/12/17023883355936_Logo.png)

![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## Contexte
## _Vous travaillez comme développeur front-end pour l’agence ArchiWebos qui comprend 50 salariés. Ayant terminé votre dernier projet avec un peu d'avance, vous êtes envoyé en renfort comme développeur front-end d’une équipe qui travaille sur la conception du site portfolio d’une architecte d’intérieur._
### 
###
## Mission
- Développer la page de présentation des travaux de l'architecte (à partir du HTML fourni) ;
- Développer la page de connexion de l'administrateur du site (le client) (code à créer de zéro) ;
- Développer la modale permettant d'uploader de nouveaux médias (code à créer from scratch).


### 
###
## Objectifs pédagogiques
- Gérer les événements utilisateurs avec JavaScript
- Manipuler les éléments du DOM avec JavaScript
- Récupérer les données utilisateurs dans le JavaScript via des formulaires

### 
###
## Projet de base

- URL du repository : https://github.com/OpenClassrooms-Student-Center/booki-starter-code
- Maquettes du site : https://www.figma.com/file/kfKHknHySoTibZfdolGAX6/Desktop?node-id=0%3A1
- Kanban : https://openclassrooms.notion.site/da3bb5863a554b34ba1a8df90d4c99af?v=df7f8dcccd9f4917a664a559f00b7ccb


### 
###
## Installation

```sh
# Création du répertoire
mkdir projet3
cd projet3

# Récupération du projet
git clone https://github.com/OpenClassrooms-Student-Center/Portfolio-architecte-sophie-bluel
cd Portfolio-architecte-sophie-bluel/
git remote set-url origin git@github.com:nicolasmorvant/projet3.git
git add .
git commit -m "Création du projet"
git push -u origin master

# Installation et Lancement du serveur
cd Backend/
npm install 
npm start
```

### 
###
## Ressources
- [Node.js](https://nodejs.org/en/) 
- [NPM](https://www.npmjs.com/)
- [Kanban](https://openclassrooms.notion.site/da3bb5863a554b34ba1a8df90d4c99af?v=df7f8dcccd9f4917a664a559f00b7ccb)
- [Documentation de l'api Swagger](http://localhost:5678/api-docs/)

###
###
## Compte de test Sophie Bluel
```
#Email
sophie.bluel@test.tld

#Mot de passe
S0phie

#Token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjA3NDM1MywiZXhwIjoxNzEyMTYwNzUzfQ.OfgurY75ziY9vu5Bdr0uu9of2GqhHTb8w8LhVScukfg
```

### 
###
## Cours

- [Apprenez à utiliser la ligne de commande dans un terminal](https://openclassrooms.com/fr/courses/6173491-apprenez-a-utiliser-la-ligne-de-commande-dans-un-terminal) 
- [Apprenez à programmer avec javascript](https://openclassrooms.com/fr/courses/7696886-apprenez-a-programmer-avec-javascript)
- [Créez des pages web dynamiques avec javascript](https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript)
- [Adoptez les API REST pour vos projets](https://openclassrooms.com/fr/courses/6573181-adoptez-les-api-rest-pour-vos-projets-web)
- [Utilisez JavaScript pour réaliser un site dynamique (WEBINAIRE)](https://app.livestorm.co/openclassrooms-1/utilisez-javascript-pour-realiser-un-site-dynamique/live?email=nicolas.morvant%40tuta.io&key=662d4e39fdf7a63246fd23&s=ce585089-cab6-4fe1-b9ee-86fa8a0880f8#/) 
- [Documenter une API avec Swagger](https://grafikart.fr/tutoriels/swagger-openapi-php-1160) 
- [Documentation de l'objet Set en javascript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Créer une fenêtre modale en JavaScript](https://grafikart.fr/tutoriels/modal-javascript-css-72)
- [Utilisation des objets FormData](https://developer.mozilla.org/fr/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects)


### 
###
## Réalisation

| Date | Réalisation |
| ------ | ------ |
| 02/04/2024| Création du projet|
|| |
|| Installation de ```npm``` et de ```node.js```|
|| Prise en main de Swagger et tests de l'api réalisés avec Postman |
|||
| 03/04/2024| Suivi des cours sur Javascript : "Apprenez à programmer avec javascript" et "Créez des pages web dynamiques avec javasript"|
|| Création du fichier ```index.js``` dans le répertoire ```/scripts```|
|||
|04/04/2023| Exercices Javascript sur les fonctions asynchrones|
|||
|05/04/2024| Récupération dynamique des données des travaux via l’API avec fetch|
|| Mise en plus du menu dynamique|
|| Mise en forme du menu dynamique dans ```styles.css```|
|||
|06/04/2024| Ajout de variables css pour les couleurs|
|| Création de trois fonctions ```afficherTravauxCategorie()```, ```afficherTousLesTravaux()``` et ```recupererDonnees()``` ```dans index.js```|
|| Création de ```login.html```|
|||
|07/04/2024| Ajout d'une feuille de styles pour la page ```login.html```|
|| Ajout du bandeau noir en mode édition sur ```index.html```|
|| Ajout de la div contenant le titre de la gallerie "Mes projets" et du bouton modifier|
|||
|09/04/2024| Ajout de la logique de création de la modale|
|| Ajout de la logique de suppression d'une réalisation|
|||
|10/04/2024| Ajout du formulaire de la modale|
|| Ajout des fonctions ```enregistrerPhoto(formdata)```, ```verifierTitre(titre)``` et ```verifierCategorie(categorie)```|
|||
|11/04/2024| Correction de la requête d'ajout de la photo|
|||
|12/04/2024| Création de ```fonctions.js```|
|| Réorganisation du code|
|||
|13/04/2024 au 15/04/2025| Finalisation de gestion des erreurs|
|||

### 
###
### INSTRUCTIONS DE BASE DU README

# Portfolio-architecte-sophie-bluel

Code du projet 6 d'intégrateur web.

## Information pour le lancer le code

 - Lancer le backend depuis votre terminal en suivant les instruction du fichier ReadMe.
 - Si vous désirez afficher le code du backend et du frontend, faites le dans 2 instances de VSCode différentes pour éviter tout problème
