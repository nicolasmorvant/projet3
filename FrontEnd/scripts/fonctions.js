/* URLS DE L'API */

    //CONNEXION
    const urlApiConnexion = "http://localhost:5678/api/users/login";

    //OBTENIR TOUS LES TRAVAUX
    const urlApiWorks = "http://localhost:5678/api/works";

    //OBTENIR TOUTES LES CATÉGORIES
    const urlApiCategories = "http://localhost:5678/api/categories";

/* FIN URLS DE L'API */




/* FORMULAIRE */

    /**
    ** FONCTION QUI VÉRIFIE LA VALEUR DE L'ADRESSE EMAIL
    * 
    * @param {string} email
    * @param {HTMLElement} pErreur
    * @returns {boolean}
    */
    function verifierEmail(email, pErreur)
    {
        let verification = false;

        //CRÉATION D'UNE EXPRESSION RÉGULIÈRE LIÉE À L'ADRESSE EMAIL
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.trim() === "")
        {
            afficherErreurFormulaire(`Le champ email est vide`, pErreur);
        }
        else
        {
            if(emailRegex.test(email))
            {
                verification = true;
            }
            else
            {
                afficherErreurFormulaire(`Le champ ${email} n'est pas valide`, pErreur);
            }
        }

        return verification;
    }


    /**
    ** FONCTION QUI VÉRIFIE LA VALEUR DU MOT DE PASSE
    * 
    * @param {string} password
    * @param {HTMLElement} pErreur
    * @returns {boolean}
    */
    //FONCTION DE VÉRIFICATION DU MOT DE PASSE
    function verifierMotDePasse(password, pErreur)
    {
        let verification = false;

        //CRÉATION D'UNE EXPRESSION RÉGULIÈRE LIÉE AU MOT DE PASSE
        let passwordRegex = /^[A-Za-z0-9._-]+$/;

        if (password.trim() === "")
        {
            afficherErreurFormulaire(`Le champ mot de passe est vide`, pErreur);
        }
        else
        {
            if(passwordRegex.test(password))
            {
                verification = true;
            }
            else
            {
                afficherErreurFormulaire(`Mauvais mot de passe`, pErreur);
            }
        }

        return verification;
    }


    /**
    ** FONCTION QUI VÉRIFIE LE FICHIER CHOISI PAR L'UTILISATEUR
    * 
    * @param {File} fichier (= e.target.files[0])
    * @param {HTMLElement} pErreur
    * @returns {boolean}
    */
    function verifierPhoto(fichier, pErreur)
    {
        //RÉCUPÉRATION DU TYPE DE FICHIER 
        let typeFichier = fichier.type;

        let verification = false;

        //console.log("Type de fichier : ", typeFichier);

        //VÉRIFICATION SI L'UTILISATEUR A BIEN CHOISI UN FICHIER AUTORISÉ (PNG OU JPEG)
        if(typeFichier === "image/png" || typeFichier === "image/jpeg")
        {
            //CRÉATION DE LA MINIATURE DE LA PHOTO
            creerApercuImageFormulairePhoto(fichier);

            effacerMessageErreur(pErreur);

            verification = true;
        }
        else
        {
            afficherErreurFormulaire("La photo ne correspond pas au format demandé (jpeg ou png)", pErreur);
        }

        return verification;
    }


    /**
    ** FONCTION QUI VÉRIFIE LA VALEUR DU CHAMP DE FORMULAIRE TITRE
    * 
    * @param {string} titre
    * @param {HTMLElement} pErreur
    * @returns {boolean}
    */
    function verifierTitre(titre, pErreur)
    {
        //CRÉATION D'UNE EXPRESSION RÉGULIÈRE LIÉE AU TITRE
        let regexTitre = /^[a-zA-Z&\- ']+$/;

        let verification = false;

        if(titre.trim() === "")
        {
            verification = false;

            afficherErreurFormulaire("Le titre ne peut pas être vide", pErreur);
        }
        else
        {
            if(regexTitre.test(titre))
            {
                verification = true;

                effacerMessageErreur(pErreur); 
            }
            else
            {
                afficherErreurFormulaire(`Le titre ${titre} ne correspond pas au format demandé`, pErreur);
            }
        }
        
        return verification;
    }


    /**
    ** FONCTION QUI VÉRIFIE LA VALEUR DU CHAMP DE FORMULAIRE CATÉGORIE
    * 
    * @param {string} categorie
    * @param {HTMLElement} pErreur
    * @returns {boolean}
    */
    function verifierCategorie(categorie, pErreur)
    {
        //CRÉATION D'UNE EXPRESSION RÉGULIÈRE ASSOCIÉE À LA CATÉGORIE
        let regexCategorie = /^[0-9]+$/;

        let verification = false;

        if(categorie === "")
        {
            afficherErreurFormulaire(`Vous devez choisir une catégorie`, pErreur);
        }
        else
        {
            if(regexCategorie.test(categorie))
            {
                effacerMessageErreur(pErreur);
                verification =  true;
            }
            else
            {
                afficherErreurFormulaire(`La categorie ${categorie} ne correspond pas au format demandé`, pErreur);
            }
        }

        return verification;
    }


    /**
    ** FONCTION QUI ACTIVE LE BOUTON D'ENVOI DU FORMULAIRE PHOTO
    * 
    * @param {HTMLElement} bouton
    * @returns {void}
    */
    function activerBouton(bouton)
    {
        bouton.classList.remove("desactive");
        bouton.classList.add("active");

        //ON PASSE DISABLED ET ARIA-DISABLED À FALSE
        bouton.removeAttribute("disabled");
        bouton.removeAttribute("aria-disabled");
    }


    /**
    ** FONCTION QUI DÉSACTIVE LE BOUTON D'ENVOI DU FORMULAIRE PHOTO
    * 
    * @param {HTMLElement} bouton
    * @returns {void}
    */
    function desactiverBouton(bouton)
    {
        bouton.classList.remove("active");
        bouton.classList.add("desactive");

        //ON PASSE DISABLED ET ARIA-DISABLED À TRUE
        bouton.setAttribute("disabled","disabled");
        bouton.setAttribute("aria-disabled", "true");
    }
    
/* FIN FORMULAIRE */




/* ERREURS */

    /**
    ** FONCTION QUI INSÈRE LE MESSAGE D'ERREUR DANS LE BLOC ERREUR
    * 
    * @param {string} msgErreur
    * @returns {void}
    */
    function afficherErreurConnexion(msgErreur)
    {
        let blocErreur = document.querySelector("#blocErreur");

        //getComputedStyle renvoie un objet de toutes les propriétés css de l'élément passé en paramètre

        if(getComputedStyle(blocErreur).display === "none")
        {
            blocErreur.style.display = "block";

            blocErreur.innerText = msgErreur;
        }
         
        blocErreur.innerText = msgErreur;
    }        


    /**
    ** FONCTION QUI INSÈRE LE MESSAGE D'ERREUR DANS LA DIV ERREUR DE L'INPUT
    * 
    * @param {string} msgErreur
    * @param {HTMLElement} pErreur
    * @returns {void}
    */
    function afficherErreurFormulaire(msgErreur,pErreur)
    {
        let styleParagrapheErreur = getComputedStyle(pErreur);

        if(styleParagrapheErreur.display === "none")
        {
            pErreur.style.display = "block";

            pErreur.innerText = msgErreur;
        }
        else
        {
            pErreur.innerText = msgErreur;
        }  
    } 


    /**
     ** FONCTION QUI CACHE LA DIV ERREUR ET EFFACE SON CONTENU
    * 
    * @param {HTMLElement} pErreur
    * @returns {void}
    */
    function effacerMessageErreur(pErreur) 
    {
        pErreur.innerText = "";
        pErreur.style.display = "none";
    }

/* FIN ERREURS */




/* FONCTIONS CONNEXION / DÉCONNEXION */

    /**
    ** FONCTION DE DÉCONNEXION DE L'UTILISATEUR
    * 
    * @param {null}
    * @returns {void}
    */
    function deconnecterUtilisateur()
    {
        //SUPPRESSION DU TOKEN DU LOCAL STORAGE
        window.localStorage.removeItem("token");

        //SUPPRESSION DE L'USER ID DU LOCAL STORAGE
        window.localStorage.removeItem("userId");
        
        //MODIFICATION DU LIEN CONNEXION
        lienConnexion = document.querySelector("#lienConnexion");
            
        lienConnexion.innerText = "";
        lienConnexion.innerText = "login";

        //REDIRECTION VERS LA PAGE D'ACCUEIL
        window.location.href = "index.html";
    }


    /**
    ** FONCTION DE CONNEXION DE L'UTILISATEUR
    * 
    * @param {null}
    * @returns {void}
    */
    async function seConnecter(email,mdp)
    {
        //TRANSFORMATION DES VALEURS DE CHAMPS DE FORMULAIRE EN JSON
        let infosConnexionJSON = 
        {
            "email": email,
            "password":mdp
        };

        let infosConnexionStr = JSON.stringify(infosConnexionJSON); 

        //REQUÊTE HTTP
        const responseConnexion = await fetch(urlApiConnexion,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: infosConnexionStr
        });

        //SI ÉTAT DE LA REQUÊTE = 200
        if(responseConnexion.ok)
        {
            const retourConnexion = await responseConnexion.json(); 

            const token = retourConnexion.token;

            const userId = retourConnexion.userId;

            //SI LE TOKEN EXISTE
            if(token)
            {   
                //SAUVEGARDE DU TOKEN DANS LE LOCAL STORAGE
                window.localStorage.setItem("token", token);
 
                //console.log(token);

                //SAUVEGARDE DE L'USER ID DANS LE LOCAL STORAGE
                window.localStorage.setItem("userId", userId);

                 //REDIRECTION VERS LA PAGE D'ACCUEIL
                window.location.href = "index.html";
            }
            else
            {
                //ON AFFICHE UN MESSAGE D'ERREUR
                
                afficherErreurConnexion("Erreur dans l’identifiant ou le mot de passe");
            }
        }
        else
        {
            afficherErreurConnexion(`Erreur dans l’identifiant ou le mot de passe`);
            throw new Error("Erreur dans l’identifiant ou le mot de passe");
        }
    }

/* FIN FONCTIONS CONNEXION / DÉCONNEXION */




/* MODE ÉDITION */

    /**
    ** FONCTION DE CRÉATION DU BANDEAU NOIR
    * 
    * @param {null}
    * @returns {void}
    */
    function creerBandeauNoir()
    {
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
    }


    /**
    ** FONCTION DE CRÉATION DU BOUTON MODIFIER
    * 
    * @param {null}
    * @returns {void}
    */
    function creerBoutonModifier()
    {
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
    }
        
/* FIN MODE ÉDITION */




/* FONCTIONS CATÉGORIES */

    /**
    ** FONCTION QUI AFFICHE UNE CATÉGORIE DE RÉALISATIONS
    * 
    * @param {null}
    * @returns {void}
    */
    function choisirCategorie()
    {
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
    
/* FIN FONCTIONS CATÉGORIES */




/* FONCTIONS PHOTOS */

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
            fetch(`${urlApiWorks}/${id}`, 
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
                    //RÉAFFICHAGE DES TRAVAUX DE LA GALERIE MODALE
                    afficherTravauxModale();

                    //SUPPRESSION DU MENU TRAVAUX
                    document.querySelector("#menuTravaux").remove();

                    //RÉAFFICHAGE DES TRAVAUX DE LA GALERIE PRINCIPALE
                    afficherTousLesTravaux(true);
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


    /** FONCTION QUI CRÉE UN APERÇU DE LA PHOTO AJOUTÉE
    * 
    * @param {File} upload
    * @returns {void} 
    */
    function creerApercuImageFormulairePhoto(upload)
    {
        //CRÉATION D'UN OBJET URL POUR RÉCUPÉRER LE LIEN DE L'IMAGE
        const uploadUrl = URL.createObjectURL(upload);

        //console.log(uploadUrl);

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


    /** FONCTION QUI RÉINITIALISE LE FORMULAIRE D'AJOUT
    * 
    * @param {null}
    * @returns {void} 
    */
    function effacerFormulaireAjoutPhoto()
    {
        /* MODIFICATION DES ÉLÉMENTS DU DOM */

            //AGRANDISSEMENT DE LA FENÊTRE MODALE
            modale.style.height = "688px";

            //RESET DE L'OVERFLOW DE LA MODALE
            modale.style.overflow = "initial";

            //MODIFICATION DU PADDING DE MODALE CONTAINER
            modaleContainer.style.padding = "20px 20px 0px;";

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

            //AJOUT DE L'OVERFLOW
            galerieModale.style.overflow = "auto";

            //DISPLAY NONE DU MODAL FOOTER
            modaleFooter.style.display = "flex";

        /* FIN MODIFICATION DES ÉLÉMENTS DU DOM */

        //RESET DE LA DIV PHOTO
        inputDivPhoto.value = "";

        //console.log(inputDivPhoto.value);
        //console.log(inputDivPhoto.files);
        
        //RESET DU TITRE
        inputTitre.value = "";

        //SUPPRESSION DES OPTIONS DU SELECT CATÉGORIE
        selectCategorie.innerHTML = "";

        //DÉSACTIVATION DU BOUTON D'ENVOI
        desactiverBouton(validerPhoto);

        //PADDING DIV PHOTO
        divPhoto.style.padding = "15px 0";

        //EFFACEMENT DES MESSAGES D'ERREUR
        effacerMessageErreur(inputPhotoErreur);
        effacerMessageErreur(inputTitreErreur);
        effacerMessageErreur(selectCategorieErreur);

        //SUPPRESSION DE LA DIV AJOUT IMAGE
        divPhoto.querySelectorAll("*").forEach(enfantDivPhoto => 
        {   
            //SUPPRESSION DE LA DIV IMAGE CONTENANT LA PHOTO AJOUTÉE
            if(enfantDivPhoto.getAttribute("id") === 'divImage')
            {
                enfantDivPhoto.remove();
            }
            else
            {
                if(enfantDivPhoto.getAttribute("id") !== "labelInputDivPhoto")
                enfantDivPhoto.style.display = "block";
            }
        });

        //MASQUAGE DU FORMULAIRE
        formulaireRealisation.style.display = "none";
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
                    "Authorization": `Bearer ${token}`
                },
                body: donneesFormulaire
            });

            const ajout = await response.json();

            //SUPPRESSION DU FORMULAIRE D'AJOUT PHOTO
            effacerFormulaireAjoutPhoto();

            //RÉAFFICHAGE DES TRAVAUX DE LA GALERIE MODALE
            afficherTravauxModale();

            //SUPPRESSION DU MENU TRAVAUX
            document.querySelector("#menuTravaux").remove();

            //RÉAFFICHAGE DES TRAVAUX DE LA GALERIE PRINCIPALE
            afficherTousLesTravaux(true);
        }
        catch(error)
        {
            console.log("Impossible d'ajouter la réalisation");
        }
    }   

/* FIN FONCTIONS PHOTOS */




/* FONCTIONS DONNÉES */

    /**
    ** FONCTION DE RÉCUPÉRATION DES TRAVAUX
    * 
    * @param {HTMLElement} conteneur
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
    * @param {null}
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
    ** FONCTION POUR AFFICHER TOUS LES TRAVAUX DANS LA GALERIE PRINCIPALE QUI PREND EN PARAMÈTRE UN BOOLÉEN (TRUE = APPLICATION D'UN FILTRE, FALSE = PAS DE FILTRE)
    * 
    * @param {boolean} applicationFiltre 
    * @returns {void} 
    */
    async function afficherTousLesTravaux(applicationFiltre = false)
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
        works.forEach(work => 
        {
            //console.log(work);

            //CRÉATION DES 3 ÉLÉMENTS DE LA FIGURE
            let figure = document.createElement("figure");
            let image = document.createElement("img");
            let figureCaption = document.createElement("figcaption");

            //SETTINGS DE L'IMAGE
            image.src = work.imageUrl;
            image.setAttribute("alt", work.title);

            if(applicationFiltre)
            {
                image.style.filter = "brightness(70%)";
            }

            //SETTINGS DE LA CAPTION
            figureCaption.innerText = work.title;

            //AJOUT DE L'IMAGE ET DE LA CAPTION À LA FIGURE FIGURE
            figure.appendChild(image);cti
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

        //ÉCOUTE DE L'EVENT CLIC POUR LE MENU TRAVAUX
        choisirCategorie();
    }


    /**
    ** FONCTION POUR AFFICHER TOUS LES TRAVAUX DANS LA GALERIE DE LA MODALE
    * 
    * @param {null}
    * @returns {void} 
    */
    async function afficherTravauxModale()
    {
        //SUPPRESSION DES WORK CONTAINERS
        supprimerWorkContainers();

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
    ** FONCTION DE SUPPRESSION DES WORK CONTAINERS
    * 
    * @param {null}
    * @returns {void} 
    */
    function supprimerWorkContainers()
    {
        document.querySelectorAll(".workContainer").forEach(workContainer =>
        {
            workContainer.remove();
        });
    }

     
    /**
    ** FONCTION QUI AFFICHE LE FORMULAIRE DE LA MODALE
    * 
    * @param {null}
    * @returns {HTMLElement} formulaire
    */
    async function afficherFormulaireModale()
    {
        //SUPPRESSION DES WORK CONTAINERS
        supprimerWorkContainers();

        //AFFICHAGE DU FORMULAIRE
        formulaireRealisation.style.display = "flex";

        /* MODIFICATION DES ÉLÉMENTS DU DOM */

            //RÉTRECISSEMENT DE LA FENÊTRE MODALE
            modale.style.height = "670px";

            //AJOUT DE L'OVERFLOW AUTO POUR GÉRER LE DÉPASSEMENT DU CONTENU DE LA MODALE EN CAS D'AFFICHAGE DES ERREURS
            modale.style.overflow = "auto";

            //MODIFICATION DU PADDING DE MODALE CONTAINER
            modaleContainer.style.padding ="20px 20px 10px 20px";

            //MODIFICATION DE LA VISIBILITÉ DE L'ICONE RETOUR
            iconeRetourModale.style.visibility = "visible";

            //AJOUT DU NOUVEAU TITRE
            titreModale.innerText = "Ajout photo";

            //AUGMENTATION DE LA HAUTEUR MAX DE LA GALERIE MODALE
            galerieModale.style.maxHeight = "100%";

            //DIMINUTION DU MARGIN TOP DE GALERIE MODALE
            galerieModale.style.marginTop = "40px";

            //SUPPRESSION DE LA BORDER DE GALERIE MODALE
            galerieModale.style.border = "0";

            //SUPPRESSION DE LOVERFLOW
            galerieModale.style.overflow = "initial";

            //DISPLAY NONE DU MODAL FOOTER
            modaleFooter.style.display = "none";

        /* FIN MODIFICATION DES ÉLÉMENTS DU DOM */

        /* AJOUT DES OPTIONS AU SELECT */

            //AJOUT D'UNE OPTION VIDE AU SELECT
            let optionVide = document.createElement("option");
            optionVide.setAttribute("value", '');
            selectCategorie.appendChild(optionVide);

            //RÉCUPÉRATION DES CATÉGORIES
            let categoriesSelect = await recupererToutesLesCategories();

            //console.log(categoriesSelect);

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

        //AJOUT DU FORMULAIRE À LA GALERIE MODALE
        galerieModale.appendChild(formulaireRealisation);
    } 

/* FIN FONCTIONS DONNÉES */




/* FONCTIONS MODALE*/

    /**
    ** FONCTION QUI AUGMENTE LA LUMINOSITÉ DES IMAGES DE LA GALERIE PRINCIPALE, DES INPUTS ET DU TEXTEAREA DU FORMULAIRE DE CONTACT
    * 
    * @param {null} 
    * @returns {void}
    */
    function augmenterLuminosite()
    {
        //TOUTES LES IMAGES
        let images = document.querySelectorAll("img");

        /* FIN RÉCUPÉRATION DES ÉLÉMENTS DU DOM */

        //SUPPRESSION DE LA COULEUR DE FOND DU BODY
        document.body.style.backgroundColor = "var(--main-bg-color)";

        images.forEach((image) => 
        {
            //SI LE PARENT LE PLUS PROCHE DE L'IMAGE N'EST PAS MODALE
            if(!(image.closest("#modale")))
            {
                image.style.filter = "brightness(100%)";
            }
        });

        inputs.forEach(input =>
        {
            input.style.filter = "brightness(100%)";
        });

        textarea.style.filter = "brightness(100%)";
    }

    
    /**
    ** FONCTION QUI DIMINUE LA LUMINOSITÉ DES IMAGES DE LA GALERIE PRINCIPALE, DES INPUTS ET DU TEXTEAREA DU FORMULAIRE DE CONTACT
    * 
    * @param {null}
    * @returns {void}
    */
    function baisserLuminosite()
    {
        //TOUTES LES IMAGES
        let images = document.querySelectorAll("img");

        //MODIFICATION DE LA COULEUR DE FOND DU BODY
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";

        images.forEach((image) => 
        {
            //SI LE PARENT LE PLUS PROCHE DE L'IMAGE N'EST PAS MODALE
            if(!(image.closest("#modale")))
            {
                image.style.filter = "brightness(70%)";
            }
        });

        inputs.forEach(input =>
        {
            if(input.getAttribute("id") !== "inputTitre")
            {
                input.style.filter = "brightness(70%)";
            }    
        });

        textarea.style.filter = "brightness(70%)";
    }


    /**
    ** FONCTION QUI AFFICHE LA MODALE
    * 
    * @param {HTMLElement} modale
    * @returns {void}
    */
    function afficherModale(modale)
    {
        //ON AFFICHE LA MODALE
        modale.style.display = "block";
        modale.classList.add("visible");

        //AFFICHAGE DES TRAVAUX DE LA MODALE
        afficherTravauxModale();    

        //RÉGLAGE DE LA LUMINOSITÉ
        baisserLuminosite();
    }


    /**
    ** FONCTION QUI CACHE LA MODALE
    * 
    * @param {HTMLElement} modale
    * @returns {void}
    */
    function cacherModale(modale)
    {
        //SUPPRESSION DES WORK CONTAINERS
        supprimerWorkContainers();

        //RESET DU FORMULAIRE AJOUT PHOTO
        effacerFormulaireAjoutPhoto();

        //RÉGLAGE DE LA LUMINOSITÉ
        augmenterLuminosite();

        //ON CACHE LA MODALE
        modale.style.display = "none";
        modale.classList.remove("visible");
    }

/* FIN FONCTIONS MODALE*/