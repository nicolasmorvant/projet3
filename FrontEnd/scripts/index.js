/* URLS DE L'API */

    //OBTENIR TOUS LES TRAVAUX
    const urlApiWorks = "http://localhost:5678/api/works";

    //OBTENIR TOUTES LES CATÉGORIES
    const urlApiCategories = "http://localhost:5678/api/categories";

/* FIN URLS DE L'API */


/* RÉCUPÉRATION DES ÉLÉMENTS DU DOM */

    //HEADER
    let mainContainer = document.querySelector("#main-container");

    //LIEN CONNEXION
    let lienConnexion = document.querySelector("#lienConnexion");

    //DIV PORTFOLIO
    let sectionPortfolio = document.querySelector("#portfolio");

    //TITRE PORTFOLIO
    let titrePortfolio = sectionPortfolio.querySelector("h2");

    //DIV CONTENANT LES TRAVAUX
    let gallerie = document.querySelector("#gallery");

    //MODALE
    let modale = document.querySelector("#modale");

    //MODALE CONTAINER
    let modaleContainer = document.querySelector("#modaleContainer");

    //MODALE CONTAINER TITRE
    let titreModaleContainer = document.querySelector("#modaleContainer h3");

    //ICONE FERMETURE MODALE
    let iconeFermetureModale = document.querySelector("#fermetureModale");

    //GALLERIE MODALE
    let gallerieModale = document.querySelector("#gallerieModale");

    //TOUTES LES IMAGES
    let images = document.querySelectorAll("img");

    //TOUS LES INPUT
    let tousLesInput = document.querySelectorAll("input");

    //TEXTAREA
    let textarea = document.querySelector("textarea");

/* FIN RÉCUPÉRATION DES ÉLÉMENTS DU DOM */


/* FONCTIONS */

    /**
    ** FONCTION QUI AFFICHE LES TRAVAUX EN FONCTION DE LA CATÉGORIE
    * 
    * @param {bouton} boutonChoixCategorie
    * @returns {void} 
    */
    function afficherTravauxCategorie(boutonChoixCategorie)
    {
        //RÉCUPÉRATION DE L'ID DE LA CATÉGORIE CONCERNÉE
        let idCategorieBouton = boutonChoixCategorie.getAttribute("category-id");

        //RÉCUPÉRATION DE TOUTES LES FIGURES
        let toutesLesFigures = gallerie.querySelectorAll("figure");
     
        //BOUTON TOUS
        if(idCategorieBouton === null)
        {
            toutesLesFigures.forEach( (figure) => 
            {
                //ON AFFICHE TOUT
                figure.style.display = "block";
            });
        }
        //LES AUTRES BOUTONS
        else
        {
            //ON PARCOURT TOUTES LES FIGURES 
            toutesLesFigures.forEach( (figure) => 
            {
                //RÉCUPÉRATION DE L'ID CATÉGORIE DE LA FIGURE
                let idCategorieFigure = figure.getAttribute("category-id");

                //CE N'EST PAS LA MÊME CATÉGORIE
                if(idCategorieBouton !== idCategorieFigure)
                {
                    figure.style.display = "none";
                }
                else
                {
                    figure.style.display = "block";
                }                 
            });
        }  
    }


    /**
    ** FONCTION POUR AFFICHER TOUS LES TRAVAUX DANS LA GALLERIE PRINCIPALE
    * 
    * @param aucun
    * @returns {void} 
    */
    async function afficherTousLesTravaux()
    {
        //RÉINITIALISATION DE LA GALLERIE
        gallerie.innerHTML = "";

        //RÉCUPÉRATION DES DONNÉES  
        const works = await recupererDonnees(gallerie);

        //RÉCUPÉRATION DES CATÉGORIES
        const categories = await recupererToutesLesCategories();

        //CRÉATION DIV MENU TRAVAUX
        let menuTravaux = document.createElement("div");

        //AJOUT D'UN ID
        menuTravaux.setAttribute("id", "menuTravaux");

        //AJOUT DU MENU TRAVAUX AVANT LA GALLERIE
        sectionPortfolio.insertBefore(menuTravaux,gallerie);

        //BOUCLE POUR PARCOURIR TOUS LES OBJETS DE LA LISTE
        works.forEach(work => {

            //console.log(work);

            //CRÉATION DES 3 ÉLÉMENTS DE LA FIGURE
            let figure = document.createElement("figure");
            let image = document.createElement("img");
            let figureCaption = document.createElement("figcaption");

            //SETTINGS DE L'IMAGE
            image.src = work.imageUrl;
            image.setAttribute("alt", work.title);

            //SETTINGS DE LA CAPTION
            figureCaption.innerText = work.title;

            //AJOUT DE L'IMAGE ET DE LA CAPTION À LA FIGURE FIGURE
            figure.appendChild(image);
            figure.appendChild(figureCaption);

            //AJOUT DE L'ID CATEGORIE A LA FIGURE
            figure.setAttribute("category-id", work.category.id);

            //AJOUT DE LA FIGURE AU CONTAINER PARENT
            gallerie.appendChild(figure);
        });

            /* CRÉATION DES BOUTONS DU MENU CATÉGORIES */

                //CRÉATION DU BOUTON TOUS À INTÉGRER AU MENU
                let boutonTous = document.createElement("button");
                boutonTous.setAttribute("id", "tous");
                boutonTous.innerText = "Tous";

                //AJOUT DE LA CLASSE .selected pour le style
                boutonTous.classList.add("selected");

                //INTÉGRATION DU BOUTON TOUS
                menuTravaux.appendChild(boutonTous);

                //BOUCLE SUR LES CATÉGORIES
                categories.forEach(categorie => 
                {
                    //CRÉATION DU BOUTON
                    let boutonCategorie = document.createElement("button");
       
                    //MODIFICATION DU NOM DE LA CATÉGORIE POUR LA CRÉATION DE L'ID
        
                        // " - " et " & " doivent être remplacés par un tiret "-"
            
                        let regex = / & /g;     // / = début de la regex, | pour le ou,  et /g pour global
            
                        let nomCategorie = categorie.name.replace(regex, '-');
            
                        nomCategorie = nomCategorie.toLowerCase();
        
                    //console.log(nomCategorie);
        
                    //SETTINGS DU BOUTON
                    boutonCategorie.setAttribute("id", nomCategorie);
                    boutonCategorie.innerText = categorie.name;      
                        
                    //AJOUT DE L'ID DE LA CATÉGORIE
                    boutonCategorie.setAttribute("category-id", categorie.id);
        
                    //AJOUT DU BOUTON
                    menuTravaux.appendChild(boutonCategorie);
                }); 

            /* FIN CRÉATION DES BOUTONS DU MENU CATÉGORIES */


            //ECOUTE D'ÉVÈNEMENTS DE CHOIX DE CATÉGORIE
            let boutonsMenuTravaux = menuTravaux.querySelectorAll("button");

            boutonsMenuTravaux.forEach( (bouton) => 
            {
                bouton.addEventListener("click", (e) => 
                {
                    //SUPPRESSION DE LA CLASSE .selected
                    boutonsMenuTravaux.forEach( (bouton) => 
                    {
                        bouton.classList.remove("selected");
                    });

                    bouton.classList.add("selected");

                    afficherTravauxCategorie(bouton);
                });
            });
    }


    /**
    ** FONCTION POUR AFFICHER TOUS LES TRAVAUX DANS LA GALLERIE DE LA MODALE
    * 
    * @param aucun
    * @returns {void} 
    */
    async function afficherTravauxModale()
    {
        //RÉINITIALISATION DE LA GALLERIE MODALE
        gallerieModale.innerHTML = "";

        //AJOUT DU STYLE POUR LA GALLERIE MODALE
        gallerieModale.style.padding = "40px 0 50px 0";

        //RÉCUPÉRATION DES TRAVAUX
        works = await recupererDonnees(gallerieModale);

        works.forEach( work => 
        {
            //CRÉATION DES ÉLÉMENTS DE LA GALLERIE
            let workContainer = document.createElement("div");
            workContainer.classList.add("workContainer");

            let image = document.createElement("img");
            image.src = work.imageUrl;

            let iconeSuppression = document.createElement("i");
            iconeSuppression.classList.add("fa-solid", "fa-trash-can");

            //AJOUT DE L'IDENTIFIANT DE LA RÉALISATION POUR PERMETTRE LA SUPPRESSION
            iconeSuppression.setAttribute("work-id", work.id);

            //AJOUT DE L'IMAGE ET DE L'ICONE AU CONTAINER
            workContainer.appendChild(image);
            workContainer.appendChild(iconeSuppression);

            //AJOUT DU CONTAINER
            gallerieModale.appendChild(workContainer);
        });

        /* ÉCOUTE ÉVÈNEMENT SUPPRESSION */

            //RÉCUPÉRATION DE TOUTES LES ICONES DE SUPPRESSION DE LA GALLERIE MODALE
            let toutesLesIconesDelete = document.querySelectorAll(".fa-trash-can");

            //console.log(toutesLesIconesDelete);

            toutesLesIconesDelete.forEach( iconeDelete => 
            {
                iconeDelete.addEventListener("click", (e) => 
                {
                    e.preventDefault();

                    let identifiantRealisation = iconeDelete.getAttribute("work-id");

                    //console.log(typeof identifiantRealisation);

                    //TRANSFORME LA CHAINE EN ENTIER
                    identifiantRealisation = parseInt(identifiantRealisation);

                    //SUPPRESSION DE LA RÉALISATION
                    supprimerTravail(identifiantRealisation);
                });
            });

        /* FIN ÉCOUTE ÉVÈNEMENT SUPPRESSION */
    }


    /**
    ** FONCTION QUI SUPPRIME UNE RÉALISATION EN FONCTION DE SON IDENTIFIANT
    * 
    * @param {integer} id
    * @returns {void} 
    */
    function supprimerTravail(id)
    {
        //ROUTE PROTÉGÉE DONC BESOIN DU TOKEN
        let token = window.localStorage.getItem("token");

        try 
        {
            fetch(`http://localhost:5678/api/works/${id}`, 
            {
                method: "DELETE",
                headers: 
                {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then( response => 
            {
                if(response.ok)
                {
                    console.log("Réalisation supprimée");

                    //RÉAFFICHAGE DES TRAVAUX DE LA GALLERIE MODALE
                    afficherTravauxModale();

                    //RÉAFFICHAGE DES TRAVAUX DE LA GALLERIE PRINCIPALE
                    afficherTousLesTravaux();
                }
                else
                {
                    console.log("Échec de la suppression");
                }
            })
        } 
        catch(error)
        {
            console.error("Impossible de supprimer la réalisation : ", error);
        }
    }


    /**
    ** FONCTION DE DÉCONNEXION
    * 
    * @param aucun
    * @returns {void} 
    */
    function deconnecterUtilisateur()
    {
        //SUPPRESSION DU TOKEN DU LOCAL STORAGE
        window.localStorage.removeItem("token");

        //MODIFICATION DU LIEN CONNEXION
        lienConnexion = document.querySelector("#lienConnexion");
            
        lienConnexion.innerText = "";
        lienConnexion.innerText = "login";
    
        //REDIRECTION VERS LA PAGE D'ACCUEIL
        window.location.href = "index.html";
    }


    /**
    ** FONCTION DE RÉCUPÉRATION DES TRAVAUX
    * 
    * @param {div} conteneur
    * @returns {json} works
    */
    async function recupererDonnees(conteneur) 
    {
        try 
        {
            const response = await fetch(urlApiWorks);
            const works = await response.json();

            //VÉRIFICATION POUR SAVOIR S'IL Y A AU MOINS UNE RÉALISATION
            if(works.length === 0)
            {
                console.log("Aucune réalisation n'a été trouvée");
                conteneur.innerHTML="<strong>Aucune réalisation n'a été trouvée</strong>";
            }
            else
            {
                return works;   
            }          
        } 
        catch(error)
        {
            console.error("Impossible de récupérer les travaux : ", error);
            conteneur.innerHTML="<strong>Impossible de récupérer les travaux</strong>";
        }
    }


    /**
    ** FONCTION DE RÉCUPÉRATION TOUTES LES CATÉGORIES DES PROJETS
    * 
    * @param aucun
    * @returns {json} categories 
    */
    async function recupererToutesLesCategories()
    {
        try 
        {
            const response = await fetch(urlApiCategories);
            const categories = await response.json();

            //VÉRIFICATION POUR SAVOIR S'IL Y A AU MOINS UNE RÉALISATION
            if(categories.length === 0)
            {
                console.log("Aucune catégorie n'a été trouvée");
            }
            else
            {
                return categories;
            }          
        } 
        catch(error)
        {
            console.error("Impossible de récupérer les catégories : ", error);
        }
    }


    /**
    ** FONCTION QUI AFFICHE LE FORMULAIRE DE LA MODALE
    * 
    * @param aucun
    * @returns {div} formulaire
    */
    async function afficherFormulaireModale()
    {
        //RÉTRECISSEMENT DE LA FENÊTRE MODALE
        modale.style.height = "670px";

        //CRÉATION DE LA FLÈCHE
        let iconeFleche = document.createElement("i");
        iconeFleche.classList.add("fa-solid", "fa-arrow-left-long");
        iconeFleche.setAttribute("id", "retour");

        //CRÉATION D'UN CONTENEUR POUR LES ICONES DE LA MODALE
        let headerModale = document.createElement("div");
        headerModale.setAttribute("id", "headerModale");

        //AJOUT DE LA FLÈCHE AU HEADER DE LA MODALE
        headerModale.appendChild(iconeFleche);

        //AJOUT DE L'ICONE DE FERMETURE
        headerModale.appendChild(iconeFermetureModale);

        //INSERTION DU HEADER DE LA MODALE
        modaleContainer.insertBefore(headerModale,titreModaleContainer);    
        
        //RÉCUPÉRATION DE L'ÉLÉMENT
        let iconeRetour = document.querySelector("#retour");

        //RÉINITIALISATION DU TITRE
        titreModaleContainer.innerText = "";

        //AJOUT DU NOUVEAU TITRE
        titreModaleContainer.innerText = "Ajout photo";

        //SUPPRESSION DU CONTENU DE LA GALLERIE PHOTOS
        gallerieModale.innerHTML = "";
        
        //SUPPRESSION DE LA BORDER DE GALLERIE MODALE
        gallerieModale.style.border = "0";
        gallerieModale.padding = "40px 0 20px 0 !important";

        //CRÉATION DU FORMULAIRE
        let formulaireRealisation = document.createElement("form");
        formulaireRealisation.setAttribute("id", "formulaireRealisation");

        /* PHOTO */

            //CRÉATION DE LA DIV PHOTO
            let divPhoto = document.createElement("div");
            divPhoto.setAttribute("id", "divPhoto");

            //CRÉATION DU CONTAINER DE L'ICONE DE LA DIV PHOTO
            let containerIconeDivPhoto = document.createElement("div");
            containerIconeDivPhoto.setAttribute("id","containerIconeDivPhoto");

            //CRÉATION DE L'ICONE DE LA DIV PHOTO
            let iconeDivPhoto = document.createElement("i");
            iconeDivPhoto.classList.add("fa-regular","fa-image");

            //CRÉATION DU BOUTON DE LA DIV PHOTO
            let boutonDivPhoto = document.createElement("button");
            boutonDivPhoto.setAttribute("id", "boutonDivPhoto");
            boutonDivPhoto.innerText = "+ Ajouter photo";
            

            /* INPUT FILE DE LA PHOTO */

                //CRÉATION
                let inputDivPhoto = document.createElement("input");
                inputDivPhoto.setAttribute("id", "inputDivPhoto");
                inputDivPhoto.setAttribute("name", "image");

                //TYPE
                inputDivPhoto.setAttribute("type", "file");

                //FORMATS ACCEPTÉS
                inputDivPhoto.setAttribute("accept", "jpg,png");

                //TAILLE MAXIMALE DE L'UPLOAD
                inputDivPhoto.setAttribute("maxlength", "4M");

                //REQUIRED
                inputDivPhoto.setAttribute("required", true);

            /* FIN INPUT FILE DE LA PHOTO */

            //CRÉATION DU PARAGRAPHE SOUS LE BOUTON
            let paragrapheDivPhoto = document.createElement("p");
            paragrapheDivPhoto.innerText = "jpg, png : 4mo max";

            //AJOUT DE L'INPUT DANS LE BOUTON
            boutonDivPhoto.appendChild(inputDivPhoto);

            //AJOUT DES ÉLÉMENTS À LA DIV PHOTO
            divPhoto.appendChild(iconeDivPhoto);
            divPhoto.appendChild(boutonDivPhoto);
            divPhoto.appendChild(paragrapheDivPhoto);

        /* FIN PHOTO */

        
        /* TITRE */

            //CRÉATION DE LA DIV TITRE
            let divTitre = document.createElement("div");
            divTitre.setAttribute("id","divTitre");

            //CRÉATION DE L'INPUT TITRE
            let inputTitre = document.createElement("input");
            inputTitre.setAttribute("id", "inputTitre")
            inputTitre.setAttribute("type", "text");
            inputTitre.setAttribute("name","titre");

            //REQUIRED
            inputTitre.setAttribute("required", true);

            //CRÉATION DU LABEL TITRE
            let labelTitre = document.createElement("label");
            labelTitre.setAttribute("for","inputTitre");
            labelTitre.innerText = "Titre";

            //AJOUT DES ÉLÉMENTS À LA DIV
            divTitre.appendChild(labelTitre);
            divTitre.appendChild(inputTitre);

        /* FIN TITRE */


        /* CATÉGORIE */

            //CRÉATION DE LA DIV CATÉGORIE
            let divCategorie = document.createElement("div");
            divCategorie.setAttribute("id", "divCategorie");

            //CRÉATION DU SELECT CATÉGORIE
            let selectCategorie = document.createElement("select");
            selectCategorie.setAttribute("id", "selectCategorie");
            selectCategorie.setAttribute("name", "categorie");

            //REQUIRED
            selectCategorie.setAttribute("required", true);

            //CRÉATION DU LABEL CATÉGORIE
            let labelCategorie = document.createElement("label");
            labelCategorie.setAttribute("for","selectCategorie");
            labelCategorie.innerText = "Catégorie";

            //AJOUT D'UNE OPTION VIDE
            let optionVide = document.createElement("option");
            optionVide.setAttribute("value", '');
            selectCategorie.appendChild(optionVide);

            //RÉCUPÉRATION DES CATÉGORIES
            let categoriesSelect = await recupererToutesLesCategories();

            //ON BOUCLE SUR LES CATÉGORIES
            categoriesSelect.forEach( categorieSelect => 
            {
                //CRÉATION D'UNE OPTION PAR CATÉGORIE
                let optionCategorie = document.createElement("option");
                
                //AJOUT DE LA VALEUR DE L'OPTION
                optionCategorie.setAttribute("value", categorieSelect.id);

                //AJOUT DU TEXTE DE L'OPTION
                optionCategorie.innerText = categorieSelect.name;

                //AJOUT DE L'OPTION AU SELECT
                selectCategorie.appendChild(optionCategorie);

            });

            //AJOUT DES ÉLÉMENTS À LA DIV CATÉGORIE
            divCategorie.appendChild(labelCategorie);
            divCategorie.appendChild(selectCategorie);

        /* FIN CATÉGORIE */

        //AJOUT DES ÉLÉMENTS AU FORMULAIRE
        formulaireRealisation.appendChild(divPhoto);
        formulaireRealisation.appendChild(divTitre);
        formulaireRealisation.appendChild(divCategorie);
        formulaireRealisation.appendChild(ajoutPhoto);

        //AJOUT DU FORMULAIRE À LA GALLERIE MODALE
        gallerieModale.appendChild(formulaireRealisation);

        //MODIFICATION DU BOUTON
        ajoutPhoto.innerText = "";
        ajoutPhoto.innerText = "Valider";
        ajoutPhoto.style.backgroundColor = "#A7A7A7";
        ajoutPhoto.style.border = "1px solid #A7A7A7";
        ajoutPhoto.style.marginTop = "40px";

        //CHANGEMENT DU TYPE EN SUBMIT
        ajoutPhoto.setAttribute("type", "submit");

        //MODIFICATION DU PADDING DE MODALE CONTAINER
        modaleContainer.style.padding ="20px 20px 10px 20px";

        //ÉCOUTE ÉVÈNEMENT CHANGE INPUT AJOUT PHOTO
        inputDivPhoto.addEventListener("change", (e) =>
        {
            //RÉCUPÉRATION DE L'UPLOAD
            const upload = e.target.files[0];

            //VÉRIFICATION SI L'UTILISATEUR A BIEN CHOISI UN FICHIER
            if(upload)
            {
                //CRÉATION D'UN OBJET URL POUR RÉCUPÉRER LE LIEN DE L'IMAGE
                const uploadUrl = URL.createObjectURL(upload);

                console.log(uploadUrl);

                //CRÉATION DE LA DIV DE L'IMAGE
                let divImage = document.createElement("div");
                divImage.style.width = "129px";
                divImage.style.height = "169px";

                //CRÉATION DE L'IMAGE
                let image = document.createElement("img");
                image.src = uploadUrl;
                image.alt = "image ajoutée par l'utilisateur";

                //AJOUT DU STYLE DE L'IMAGE
                image.style.width = "100%";
                image.style.height = "100%";
                image.style.objectFit = "cover";

                //SUPPRESSION DU CONTENU DE LA DIV PHOTO
                divPhoto.innerHTML = "";

                //SUPPRESSION DU PADDING
                divPhoto.style.padding = "0";

                //AJOUT DE L'IMAGE À LA DIV IMAGE
                divImage.appendChild(image);

                //AJOUT DE LA DIV IMAGE À LA DIV PHOTO
                divPhoto.appendChild(divImage);
            }

        });

        //ÉCOUTE ÉVÈNEMENT CLIC ENVOI DU FORMULAIRE
        ajoutPhoto.addEventListener("click", (e) =>
        {
            e.preventDefault();

            //CRÉATION D'UN OBJET FORMDATA
            const formData = new FormData(formulaireRealisation);

            formulaireRealisation.append(formulaireRealisation.image);
            formulaireRealisation.append(formulaireRealisation.titre);
            formulaireRealisation.append(formulaireRealisation.categorie);

            
            //RÉCUPÉRATION DES VALEURS DES CHAMPS DE FORMULAIRE
            let valTitre = inputTitre.value;
            let valCategorie = selectCategorie.value;

            //VÉRIFICATION DES VALEURS DES CHAMPS DE FORMULAIRE
            if(verifierTitre(valTitre) && verifierCategorie(valCategorie))
            {
                //ENVOI DE L'OBJET FORMDATA À LA FONCTION D'ENREGISTREMENT
                enregistrerPhoto(formData);  
            }          
        });
        
        //ÉCOUTE ÉVÈNEMENT CLIC RETOUR VERS LA GALLERIE MODALE
        iconeRetour.addEventListener("click", () => 
        {
            //RÉCUPÉRATION DE L'ICONE DE FERMETURE DE LA MODALE
            modaleContainer.insertBefore(headerModale,iconeFermetureModale);

            //SUPPRESSION DE HEADER MODALE
            modaleContainer.removeChild(headerModale);

            //SUPPRESSION DU CONTENU DE LA GALLERIE PHOTOS
            gallerieModale.innerHTML = "";

            //RECHARGEMENT DE LA BIBLIOTHÈQUE MODALE
            afficherTravauxModale();
        });
    } 


    /**
    ** FONCTION QUI VÉRIFIE LA VALEUR DU CHAMP DE FORMULAIRE TITRE
    * 
    * @param {string} titre
    * @returns {boolean}
    */
    function verifierTitre(titre)
    {
        //BOOLÉEN DE VÉRIFICATION
        let verification = false;

        //CRÉATION D'UNE EXPRESSION RÉGULIÈRE LIÉE AU TITRE
        let regexTitre = /^[a-zA-Z&\- ]+$/;

        //SUPPRESSION DES ESPACES EN DÉBUT ET FIN DE CHAINE
        let titreTrim = titre.trim();

        if(titreTrim !== "" && regexTitre.test(titreTrim))
        {
            verification = true;   
        }

        return verification;
    }


    /**
    ** FONCTION QUI VÉRIFIE LA VALEUR DU CHAMP DE FORMULAIRE CATÉGORIE
    * 
    * @param {string} categorie
    * @returns {boolean}
    */
    function verifierCategorie(categorie)
    {
        //BOOLÉEN DE VÉRIFICATION
        let verification = false;

        //CRÉATION D'UNE EXPRESSION RÉGULIÈRE ASSOCIÉE À LA CATÉGORIE
        let regexCategorie = /^[0-9]+$/;

        //SUPPRESSION DES ESPACES EN DÉBUT ET FIN DE CHAINE
        let categorieTrim = categorie.trim();

        if(categorieTrim !== "" && regexCategorie.test(categorieTrim))
        {
            verification = true;
        }

        return verification;
    }


    /**
    ** FONCTION QUI ENREGISTRER UNE RÉALISATION DANS LA BASE DE DONNÉES
    * 
    * @param {FormData} données de formulaire
    * @returns {void}
    */
    async function enregistrerPhoto(donneesFormulaire)
    {
        //RÉCUPÉRATION DU TOKEN
        let token = window.localStorage.getItem("token");

        try
        {
            const response = await fetch(urlApiWorks, 
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
                body: donneesFormulaire
            });

            const ajout = await response.json();
            console.log(ajout);
        }
        catch(error)
        {
            console.log("Impossible d'ajouter la réalisation");
        }
    }


    /**
    ** FONCTION QUI AFFICHE LA MODALE
    * 
    * @param {div} modal
    * @returns {void}
    */
    function afficherModale(modal)
    {
        modal.style.display = "block";
        modal.classList.add("visible");

        //Modification de la couleur de fond du body
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";

        images.forEach((image) => 
        {
            //SI LE PARENT LE PLUS PROCHE DE L'IMAGE N'EST PAS MODALE
            if(!(image.closest("#modale")))
            {
                image.style.filter = "brightness(70%)";
            }
        });

        tousLesInput.forEach(input =>
        {
            input.style.filter = "brightness(70%)";
        });

        textarea.style.filter = "brightness(70%)";
    }


    /**
    ** FONCTION QUI CACHE LA MODALE
    * 
    * @param {div} modal
    * @returns {void}
    */
    function cacherModale(modal)
    {
        modal.style.display = "none";
        modal.classList.remove("visible");

        document.body.style.backgroundColor = "";

        images.forEach((image) => 
        {
            //SI LE PARENT LE PLUS PROCHE DE L'IMAGE N'EST PAS MODALE
            if(!(image.closest("#modale")))
            {
                image.style.filter = "brightness(100%)";
            }
        });

        tousLesInput.forEach(input =>
        {
                input.style.filter = "brightness(100%)";
        });

        textarea.style.filter = "brightness(100%)";
    }

/* FIN FONCTIONS */


//AFFICHAGE DES TRAVAUX DU PORTFOLIO
afficherTousLesTravaux();


//SI L'UTILISATEUR EST AUTHENTIFIÉ
if(window.localStorage.getItem("token"))
{       
    //AJOUT DU BANDEAU NOIR MODE ÉDITION
    let bandeau = document.createElement("div");

    //AJOUT DU STYLE DU BANDEAU
    bandeau.style.backgroundColor = "#000000";
    bandeau.style.color = "#FFFFFF";
    bandeau.style.height = "59px";
    bandeau.style.display = "flex";
    bandeau.style.justifyContent = "center";
    bandeau.style.alignItems = "center";
    bandeau.style.fontWeight = "400";
    bandeau.style.fontSize = "16px";

    //CRÉATION DES ÉLÉMENTS DU BANDEAU
    let span = document.createElement("span");
    span.innerText = "Mode édition";

    let icone = document.createElement("i");
    icone.classList.add("fa-solid", "fa-pen-to-square");
    icone.style.marginRight = "10px";

    //AJOUT DES ÉLÉMENTS DU BANDEAU
    bandeau.append(icone,span);

    //AJOUT AU BODY AVANT LE HEADER
    document.body.insertBefore(bandeau,mainContainer);

    //CRÉATION D'UNE DIV POUR LE TITRE ET LE BOUTON MODIFIER
    let divTitreBoutonModif = document.createElement("div");
    divTitreBoutonModif.setAttribute("id", "titreEtModif");
    divTitreBoutonModif.style.display = "flex";
    divTitreBoutonModif.style.justifyContent = "center";
    divTitreBoutonModif.style.alignItems = "center";
    divTitreBoutonModif.style.height = "36px";
    divTitreBoutonModif.style.marginBottom = "50px";

    //CRÉATION DES ÉLÉMENTS DE LA DIV
    let boutonModifier = document.createElement("button");
    boutonModifier.setAttribute("id", "modifier");
    boutonModifier.style.width = "84px";   
    boutonModifier.style.height = "18px"; 
    boutonModifier.style.backgroundColor = "transparent";
    boutonModifier.style.border = "none";
    boutonModifier.style.marginLeft = "20px";
    boutonModifier.style.display = "flex";
    boutonModifier.style.alignItems = "end";

    let iconeBoutonModifier = document.createElement("i");
    iconeBoutonModifier.classList.add("fa-solid", "fa-pen-to-square");
    iconeBoutonModifier.style.marginRight = "10px";
    iconeBoutonModifier.style.width = "16px";
    iconeBoutonModifier.style.height = "16px";

    let spanModifier = document.createElement("span");
    spanModifier.innerText = "modifier";
    spanModifier.style.width = "58px";
    
    //AJOUT DES ÉLÉMENTS DU BOUTON
    boutonModifier.appendChild(iconeBoutonModifier);
    boutonModifier.appendChild(spanModifier);

    //SUPPRESSION DE LA MARGE DU TITRE H2 DE PORTFOLIO
    titrePortfolio.style.marginBottom = "0";

    //AJOUT DU TITRE DU PORTFOLIO À LA DIV
    divTitreBoutonModif.appendChild(titrePortfolio);

    //AJOUT DU BOUTON À LA DIV
    divTitreBoutonModif.appendChild(boutonModifier);

    //AJOUT DE LA DIV À LA SECTION PORTFOLIO
    sectionPortfolio.insertBefore(divTitreBoutonModif,gallerie);

    //ÉCOUTE ÉVÈNEMENT HOVER BOUTON
    boutonModifier.addEventListener("mouseover", () => 
    {
        boutonModifier.style.color = "var(--main-orange)";
    });

    boutonModifier.addEventListener("mouseout", () => 
    {
        boutonModifier.style.color = "initial";
    });

    
    /* MODALE */

        //ÉCOUTE ÉVÈNEMENT AU CLIC DU BOUTON MODIFIER
        boutonModifier.addEventListener("click", (e) => 
        {
            e.preventDefault();

            //AFFICHAGE DE LA MODALE
            afficherModale(modale);

            //AFFICHAGE DES TRAVAUX DANS LA LA GALLERIE DE LA MODALE
            afficherTravauxModale();

            //ÉCOUTE ÉVÈNEMENT AU CLIC DU BOUTON AJOUTER UNE PHOTO
            ajoutPhoto.addEventListener("click", (e) => 
            {
                e.preventDefault();

                afficherFormulaireModale();
            });

            //ÉCOUTE ÉVÈNEMENT AU CLIC DE L'ICONE DE FERMETURE DU MODALE
            iconeFermetureModale.addEventListener("click", () =>
            {
                cacherModale(modale);
            });


            //SI LA MODALE EST VISIBLE
            if(modale.classList.contains("visible"))
            {   
                //ÉCOUTE CLIC SOURIS N'IMPORTE OÙ DANS LA PAGE
                document.addEventListener("click", (e) => 
                {     
                    //e.target = la source de l'évènement

                    //SI LE CLIC EST À L'EXTÉRIEUR DE LA MODALE
                    if(!boutonModifier.contains(e.target))
                    {
                        if(!modale.contains(e.target))
                        {
                            cacherModale(modale);
                        }
                    }
                });
            }
        });

    /* FIN MODALE */

    //MODIFICATION DU STYLE DU LIEN LOGIN
    lienConnexion.innerText = "";
    lienConnexion.innerText = "logout";
}

//ÉCOUTE ÉVÈNEMENT CLIC LIEN CONNEXION
lienConnexion.addEventListener("click", () => 
{
    //SI L'UTILISATEUR EST AUTHENTIFIÉ
    if(window.localStorage.getItem("token"))
    {
        //DÉCONNEXION
        deconnecterUtilisateur();
    }
});