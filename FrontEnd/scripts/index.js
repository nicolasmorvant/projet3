/* URLS DE L'API */

    //OBTENIR TOUS LES TRAVAUX
    const urlApiWorks = "http://localhost:5678/api/works";

    //OBTENIR TOUTES LES CATÉGORIES
    const urlApiCategories = "http://localhost:5678/api/categories";

/* FIN URLS DE L'API */


/* RÉCUPÉRATION DES ÉLÉMENTS DU DOM */

    //MAIN CONTAINER
    let mainContainer = document.querySelector("#main-container");

    //LIEN CONNEXION
    let lienConnexion = document.querySelector("#lienConnexion");

    //DIV PORTFOLIO
    let sectionPortfolio = document.querySelector("#portfolio");

    //TITRE PORTFOLIO
    let titrePortfolio = sectionPortfolio.querySelector("h2");

    //DIV CONTENANT LES TRAVAUX
    let galerie = document.querySelector("#galery");

    //MODALE
    let modale = document.querySelector("#modale");

    //MODALE CONTAINER
    let modaleContainer = document.querySelector("#modaleContainer");

    //MODALE HEADER
    let modaleHeader = document.querySelector("#modaleHeader");

    //FOOTER HEADER
    let modaleFooter = document.querySelector("#modaleFooter");

    //MODALE CONTAINER TITRE
    let titreModale = document.querySelector("#titreModale");

    //BOUTON AJOUT PHOTO
    let ajoutPhoto = document.querySelector("#ajoutPhoto");

    //ICONE RETOUR MODALE
    let iconeRetourModale = document.querySelector("#retourModale");

    //ICONE FERMETURE MODALE
    let iconeFermetureModale = document.querySelector("#fermetureModale");

    //GALERIE MODALE
    let galerieModale = document.querySelector("#galerieModale");

    //FORMULAIRE AJOUT PHOTO
    let formulaireRealisation = document.querySelector("#formulaireRealisation");

    //INPUT FORMULAIRE AJOUT PHOTO
    let inputDivPhoto = document.querySelector("#inputDivPhoto");

    //SELECT FORMULAIRE AJOUT PHOTO
    let selectCategorie = document.querySelector("#selectCategorie");

    //BOUTON FORMULAIRE MODAL
    let validerPhoto = document.querySelector("#validerPhoto");

    //TOUTES LES IMAGES
    let toutesLesImages = document.querySelectorAll("img");

    //TOUS LES INPUT
    let tousLesInput = document.querySelectorAll("input");

    //TEXTAREA
    let textarea = document.querySelector("textarea");

/* FIN RÉCUPÉRATION DES ÉLÉMENTS DU DOM */


/* FONCTIONS */

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
    ** FONCTION POUR AFFICHER TOUS LES TRAVAUX DANS LA GALERIE PRINCIPALE
    * 
    * @param aucun
    * @returns {void} 
    */
    async function afficherTousLesTravaux()
    {
        //RÉINITIALISATION DE LA GALERIE
        galerie.innerHTML = "";

        //RÉCUPÉRATION DES DONNÉES  
        const works = await recupererDonnees(galerie);

        //RÉCUPÉRATION DES CATÉGORIES
        const categories = await recupererToutesLesCategories();

        //CRÉATION DIV MENU TRAVAUX
        let menuTravaux = document.createElement("div");

        //AJOUT D'UN ID
        menuTravaux.setAttribute("id", "menuTravaux");

        //AJOUT DU MENU TRAVAUX AVANT LA GALERIE
        sectionPortfolio.insertBefore(menuTravaux,galerie);

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
            galerie.appendChild(figure);
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
        let toutesLesFigures = galerie.querySelectorAll("figure");
     
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
    ** FONCTION POUR AFFICHER TOUS LES TRAVAUX DANS LA GALERIE DE LA MODALE
    * 
    * @param aucun
    * @returns {void} 
    */
    async function afficherTravauxModale()
    {
        //MASQUAGE DU FORMULAIRE MODALE
        formulaireRealisation.style.display = "none";

        //SI LES TRAVAUX ONT DÉJÀ ÉTÉ RÉCUPÉRÉS DANS LA MODALE
        if((document.querySelectorAll(".workContainer")).length > 0)
        {
            document.querySelectorAll(".workContainer").forEach(workContainer =>
            {
                workContainer.style.display = "block";
            });
        }
        //PREMIÈRE OUVERTURE DE LA MODALE
        else
        {
            //RÉCUPÉRATION DES TRAVAUX
            let works = await recupererDonnees(galerieModale);

            works.forEach( work => 
            {
                //CRÉATION DES ÉLÉMENTS DE LA GALERIE MODALE
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
                galerieModale.appendChild(workContainer);
            });
        }

        /* ÉCOUTE ÉVÈNEMENT SUPPRESSION */

            //RÉCUPÉRATION DE TOUTES LES ICONES DE SUPPRESSION DE LA GALERIE MODALE
            let toutesLesIconesDelete = document.querySelectorAll(".fa-trash-can");

            toutesLesIconesDelete.forEach( iconeDelete => 
            {
                iconeDelete.addEventListener("click", (e) => 
                {
                    e.preventDefault();

                    let identifiantRealisation = iconeDelete.getAttribute("work-id");

                    //console.log(typeof identifiantRealisation);

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

                    //RÉAFFICHAGE DES TRAVAUX DE LA GALERIE MODALE
                    afficherTravauxModale();

                    //RÉAFFICHAGE DES TRAVAUX DE LA GALERIE PRINCIPALE
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
        lienConnexion.innerText = "login";
    
        //REDIRECTION VERS LA PAGE D'ACCUEIL
        window.location.href = "index.html";
    }


    /**
    ** FONCTION QUI AFFICHE LE FORMULAIRE DE LA MODALE
    * 
    * @param aucun
    * @returns {div} formulaire
    */
    async function afficherFormulaireModale()
    {
        document.querySelectorAll(".workContainer").forEach(workContainer =>
        {
            workContainer.style.display = "none";
        });

        //AFFICHAGE DU FORMULAIRE
        formulaireRealisation.style.display = "flex";

        /* MODIFICATION DES ÉLÉMENTS DU DOM */

            //RÉTRECISSEMENT DE LA FENÊTRE MODALE
            modale.style.height = "670px";

            //MODIFICATION DU PADDING DE MODALE CONTAINER
            modaleContainer.style.padding ="20px 20px 10px 20px";

            //MODIFICATION DE LA VISIBILITÉ DE L'ICONE RETOUR
            iconeRetourModale.style.visibility = "visible";

            //AJOUT DU NOUVEAU TITRE
            titreModale.innerText = "Ajout photo";

            //DIMINUTION DU MARGIN TOP DE GALERIE MODALE
            galerieModale.style.marginTop = "40px";

            //SUPPRESSION DE LA BORDER DE GALERIE MODALE
            galerieModale.style.border = "0";

            //DISPLAY NONE DU MODAL FOOTER
            modaleFooter.style.display = "none";

        /* FIN MODIFICATION DES ÉLÉMENTS DU DOM */

        //RESET DE LA DIV PHOTO
        
        //RESET DU TITRE
        inputTitre.value = "";

        //SI AUCUNE OPTION N'A DÉJÀ ÉTÉ AJOUTÉE, CRÉATION DES OPTIONS
        if(selectCategorie.length === 0)
        {
            /* AJOUT DES OPTIONS AU SELECT */

                //AJOUT D'UNE OPTION VIDE AU SELECT
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

            /* FIN AJOUT DES OPTIONS AU SELECT */
        }

        //AFFICHAGE DU FORMULAIRE
        formulaireRealisation.style.display = "flex";

        //AJOUT DU FORMULAIRE À LA GALERIE MODALE
        galerieModale.appendChild(formulaireRealisation);

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
                divImage.setAttribute("id", "divImage");

                //CRÉATION DE L'IMAGE
                let imageAjoutee = document.createElement("img");
                imageAjoutee.setAttribute("id", "imageAjoutee");
                imageAjoutee.src = uploadUrl;
                imageAjoutee.alt = "image ajoutée par l'utilisateur";

                //SUPPRESSION DU PADDING
                divPhoto.style.padding = "0";

                //ON MASQUE LES ÉLÉMENTS DE LA DIV PHOTO DÉJÀ PRÉSENTS
                divPhoto.querySelectorAll("*").forEach(enfantDivPhoto => 
                {
                    enfantDivPhoto.style.display = "none";
                });

                //AJOUT DE L'IMAGE À LA DIV IMAGE
                divImage.appendChild(imageAjoutee);

                //AJOUT DE LA DIV IMAGE À LA DIV PHOTO
                divPhoto.appendChild(divImage);
            }
        });

        //ÉCOUTE DES ÉVÈNEMENTS AU CHANGEMENT DE LA VALEUR D'UN CHAMP DE FORMULAIRE
        formulaireRealisation.addEventListener("change", () => 
        {   
            console.log(inputDivPhoto.value);

            //RÉCUPÉRATION DES VALEURS DES CHAMPS DE FORMULAIRE
            let photo = inputDivPhoto.files[0];
            let valTitre = inputTitre.value;
            let valCategorie = selectCategorie.value;

            console.log(photo);

            if(photo && verifierTitre(valTitre) && verifierCategorie(valCategorie))
            {
                //ON CHANGE LE BOUTON EN VERT
                validerPhoto.style.backgroundColor = "var(--main-green)";

                //ON PASSE DISABLED ET ARIA-DISABLED À FALSE
                validerPhoto.removeAttribute("disabled");
                validerPhoto.removeAttribute("aria-disabled");
            }
            else
            {
                //ON RÉINITIALISE LA BACKGROUND COLOR DU BOUTON
                validerPhoto.style.backgroundColor = "";

                //ON PASSE DISABLED ET ARIA-DISABLED À TRUE
                validerPhoto.setAttribute("disabled","true");
                validerPhoto.setAttribute("aria-disabled", "true");
            }
        });

        //ÉCOUTE ÉVÈNEMENT CLIC ENVOI DU FORMULAIRE
        validerPhoto.addEventListener("click", (e) =>
        {
            e.preventDefault();

            //RÉCUPÉRATION DES VALEURS DES CHAMPS DE FORMULAIRE
            let photo = inputDivPhoto.files[0];
            let valTitre = inputTitre.value;
            let valCategorie = selectCategorie.value;

            //console.log(photo);

            //CRÉATION D'UN OBJET FORMDATA
            const formData = new FormData(formulaireRealisation);

            //CRÉATION DE PAIRES CLÉ-VALEUR ET AJOUT À FORM DATA
            formData.append("image", photo);
            formData.append("titre", valTitre);
            formData.append("categorie", valCategorie);

            //console.log(formData);

            //ENVOI DE L'OBJET FORMDATA À LA FONCTION D'ENREGISTREMENT
            enregistrerPhoto(formData);          
        });
        
        //ÉCOUTE ÉVÈNEMENT CLIC RETOUR VERS LA GALERIE MODALE
        iconeRetourModale.addEventListener("click", (e) => 
        {
            e.preventDefault();

            /* MODIFICATION DES ÉLÉMENTS DU DOM */

                //AGRANDISSEMENT DE LA FENÊTRE MODALE
                modale.style.height = "688px";

                //MODIFICATION DU PADDING DE MODALE CONTAINER
                modaleContainer.style.padding ="20px 20px 0px;";

                //MODIFICATION DE LA VISIBILITÉ DE L'ICONE RETOUR
                iconeRetourModale.style.visibility = "hidden";

                //AJOUT DU NOUVEAU TITRE
                titreModale.innerText = "Galerie photo";

                //MODIFICATION MARGIN DE GALERIE MODALE
                galerieModale.style.marginTop = "50px";
                galerieModale.style.marginBottom = "0";

                //MODIFICAITON PADDING BOTTOM DE GALERIE MODALE
                galerieModale.style.paddingBottom = "40px";

                //AJOUT DE LA BORDER DE GALERIE MODALE
                galerieModale.style.borderBottom = "1px solid #B3B3B3";

                //DISPLAY NONE DU MODAL FOOTER
                modaleFooter.style.display = "flex";

                //PADDING DIV PHOTO
                divPhoto.style.padding = "15px 0";

            /* FIN MODIFICATION DES ÉLÉMENTS DU DOM */

            //RÉINITIALISATION DES ÉLÉMENTS DE LA DIV PHOTO ET SUPPRESSION DE LA DIV AJOUT IMAGE
            divPhoto.querySelectorAll("*").forEach(enfantDivPhoto => 
            {
                //AFFICHAGE DES ÉLÉMENTS PRÉCÉDEMMENT MASQUÉS
                if(enfantDivPhoto.style.display === "none")
                {
                    enfantDivPhoto.style.display = "block";
                }
                
                //SUPPRESSION DE LA DIV IMAGE CONTENANT LA PHOTO AJOUTÉE
                if(enfantDivPhoto.getAttribute("id") === 'divImage')
                {
                    enfantDivPhoto.remove();
                }
            });

            //SUPPRESSION DE L'IMAGE AJOUTÉE
            inputDivPhoto.value = "";

            //MASQUAGE DU FORMULAIRE
            formulaireRealisation.style.display = "none";

            //AFFICHAGE DES WORK CONTAINERS
            document.querySelectorAll(".workContainer").forEach(workContainer =>
            {
                workContainer.style.display = "block";
            });
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
        let regexTitre = /^[a-zA-Z&\- ']+$/;

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
    * @param {div} modale
    * @returns {void}
    */
    function afficherModale(modale)
    {
        modale.style.display = "block";
        modale.classList.add("visible");

        //Modification de la couleur de fond du body
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";

        toutesLesImages.forEach((image) => 
        {
            //SI LE PARENT LE PLUS PROCHE DE L'IMAGE N'EST PAS MODALE
            if(!(image.closest("#modale")))
            {
                image.style.filter = "brightness(70%)";
            }
        });

        tousLesInput.forEach(input =>
        {
            if(!input.getAttribute("id") === "inputTitre")
            {
                input.style.filter = "brightness(70%)";
            }    
        });

        textarea.style.filter = "brightness(70%)";
    }


    /**
    ** FONCTION QUI CACHE LA MODALE
    * 
    * @param {div} modale
    * @returns {void}
    */
    function cacherModale(modale)
    {
        modale.style.display = "none";
        modale.classList.remove("visible");

        //RESET DU BACKGROUND COLOR
        document.body.style.backgroundColor = "";

        //RESET DE LA DIV PHOTO
        divPhoto.querySelectorAll("*").forEach(enfantDivPhoto => 
        {
            //AFFICHAGE DES ÉLÉMENTS PRÉCÉDEMMENT MASQUÉS
            if(enfantDivPhoto.style.display === "none")
            {
                enfantDivPhoto.style.display = "block";
            }
                
            //SUPPRESSION DE LA DIV IMAGE CONTENANT LA PHOTO AJOUTÉE
            if(enfantDivPhoto.getAttribute("id") === 'divImage')
            {
                enfantDivPhoto.remove();
            }
        });

        divPhoto.style.padding = "15px 0";

        //RESET DU SELECT
        selectCategorie.innerHTML = '';

        //MASQUAGE DU FORMULAIRE
        formulaireRealisation.style.display = "none";

        //MASQUAGE DES WORK CONTAINERS
        document.querySelectorAll(".workContainer").forEach(workContainer =>
        {
            workContainer.style.display = "none";
        });
    
        /* MODIFICATION DES ÉLÉMENTS DU DOM */

            //AGRANDISSEMENT DE LA FENÊTRE MODALE
            modale.style.height = "688px";

            //MODIFICATION DU PADDING DE MODALE CONTAINER
            modaleContainer.style.padding ="20px 20px 0px;";

            //MODIFICATION DE LA VISIBILITÉ DE L'ICONE RETOUR
            iconeRetourModale.style.visibility = "hidden";

            //AJOUT DU NOUVEAU TITRE
            titreModale.innerText = "Galerie photo";

            //MODIFICATION MARGIN DE GALERIE MODALE
            galerieModale.style.marginTop = "50px";
            galerieModale.style.marginBottom = "0";

            //MODIFICAITON PADDING BOTTOM DE GALERIE MODALE
            galerieModale.style.paddingBottom = "40px";

            //AJOUT DE LA BORDER DE GALERIE MODALE
            galerieModale.style.borderBottom = "1px solid #B3B3B3";

            //DISPLAY NONE DU MODAL FOOTER
            modaleFooter.style.display = "flex";

        /* FIN MODIFICATION DES ÉLÉMENTS DU DOM */

        toutesLesImages.forEach((image) => 
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
    /* CRÉATION DU BANDEAU NOIR */

        //DIV
        let bandeauNoir = document.createElement("div");
        bandeauNoir.setAttribute("id","bandeauNoir");

        //ICONE
        let iconeBandeauNoir = document.createElement("i");
        iconeBandeauNoir.classList.add("fa-solid", "fa-pen-to-square");
        iconeBandeauNoir.setAttribute("id","iconeBandeauNoir");

        //SPAN
        let spanBandeauNoir = document.createElement("span");
        spanBandeauNoir.innerText = "Mode édition";

        //AJOUT DES ÉLÉMENTS DU BANDEAU
        bandeauNoir.append(iconeBandeauNoir,spanBandeauNoir);

        //AJOUT AU BODY AVANT LE MAIN CONTAINER
        document.body.insertBefore(bandeauNoir,mainContainer);

    /* FIN CRÉATION DU BANDEAU NOIR */    


    /* BOUTON MODIFIER */

        //DIV
        let divBoutonModifier = document.createElement("div");
        divBoutonModifier.setAttribute("id", "divBoutonModifier");

        //BUTTON
        let boutonModifier = document.createElement("button");
        boutonModifier.setAttribute("id", "boutonModifier");

        //ICONE
        let iconeBoutonModifier = document.createElement("i");
        iconeBoutonModifier.classList.add("fa-solid", "fa-pen-to-square");
        iconeBoutonModifier.setAttribute("id", "iconeBoutonModifier");

        //SPAN
        let spanBoutonModifier = document.createElement("span");
        spanBoutonModifier.innerText = "modifier";
        spanBoutonModifier.setAttribute("id","spanBoutonModifier");

        //AJOUT DES ÉLÉMENTS DU BOUTON
        boutonModifier.appendChild(iconeBoutonModifier);
        boutonModifier.appendChild(spanBoutonModifier);

        //SUPPRESSION DE LA MARGE DU TITRE H2 DE PORTFOLIO
        titrePortfolio.style.marginBottom = "0";

        //AJOUT DU TITRE DU PORTFOLIO À LA DIV
        divBoutonModifier.appendChild(titrePortfolio);

        //AJOUT DU BOUTON À LA DIV
        divBoutonModifier.appendChild(boutonModifier);

        //AJOUT DE LA DIV À LA SECTION PORTFOLIO
        sectionPortfolio.insertBefore(divBoutonModifier,galerie);

        //ÉCOUTE ÉVÈNEMENT HOVER BOUTON
        boutonModifier.addEventListener("mouseover", () => 
        {
            boutonModifier.style.color = "var(--main-orange)";
        });

        boutonModifier.addEventListener("mouseout", () => 
        {
            boutonModifier.style.color = "initial";
        });

    /* FIN BOUTON MODIFIER */
    

    /* MODALE */

        //ÉCOUTE ÉVÈNEMENT AU CLIC DU BOUTON MODIFIER
        boutonModifier.addEventListener("click", (e) => 
        {
            e.preventDefault();

            //AFFICHAGE DE LA MODALE
            afficherModale(modale);

            //AFFICHAGE DES TRAVAUX DANS LA LA GALERIE DE LA MODALE
            afficherTravauxModale();

            //ÉCOUTE ÉVÈNEMENT AU CLIC DU BOUTON AJOUTER UNE PHOTO
            ajoutPhoto.addEventListener("click", (e) => 
            {
                e.preventDefault();

                //AFFICHAGE DU FORMULAIRE DE LA MODALE
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