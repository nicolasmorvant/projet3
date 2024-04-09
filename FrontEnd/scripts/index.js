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
    let modal = document.querySelector("#modal");

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

    //FONCTION DE FILTRAGE PAR CATÉGORIE | PARAMÈTRE : LE BOUTON DE LA CATÉGORIE CHOISIE
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

    //FONCTION POUR AFFICHER TOUS LES TRAVAUX DANS LA GALLERIE
    async function afficherTousLesTravaux()
    {
        //RÉINITIALISATION DE LA GALLERIE
        gallerie.innerHTML = "";

        //RÉCUPÉRATION DES DONNÉES  
        const works = await recupererDonnees(gallerie);

        //RÉCUPÉRATION DES CATÉGORIES
        const categories = await recupererCategories();

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

    //FONCTION POUR AFFICHER TOUS LES TRAVAUX DANS LA MODALE
    async function afficherTravauxModale()
    {
        //RÉINITIALISATION DE LA GALLERIE MODALE
        gallerieModale.innerHTML = "";

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

            //AJOUT DE L'IMAGE ET DE L'ICONE AU CONTAINER
            workContainer.appendChild(image);
            workContainer.appendChild(iconeSuppression);

            //AJOUT DU CONTAINER
            gallerieModale.appendChild(workContainer);
        });
    }

    //FONCTION DE DÉCONNEXION
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

    //FONCTION DE RÉCUPÉRATION DES DONNÉES | PARAMÈTRE : LE CONTENEUR RECEVANT LES DONNÉES
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

    //FONCTION DE RÉCUPÉRATION DES CATÉGORIES
    async function recupererCategories()
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

    
    /* MODAL */
        
        /* FONCTION D'AFFICHAGE DE LA MODALE */

            function toggleModal(modal)
            {
                if(modal.style.display === "block")
                {
                    modal.style.display = "none";

                    document.body.style.backgroundColor = "";
                }
                else
                {
                    modal.style.display = "block";

                    //Modification de la couleur de fond du body
                    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";

                    images.forEach((image) => 
                    {
                        //SI LE PARENT LE PLUS PROCHE DE L'IMAGE N'EST PAS MODAL
                        if(!(image.closest("#modal")))
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
            }

        /* FIN FONCTION D'AFFICHAGE DE LA MODALE */


        //ÉCOUTE ÉVÈNEMENT AU CLIC DU BOUTON MODIFIER
        boutonModifier.addEventListener("click", (e) => 
        {
            e.preventDefault();

            toggleModal(modal);

            afficherTravauxModale();

        });

    /* FIN MODAL */

    //MODIFICATION DU STYLE DU LIEN LOGIN
    lienConnexion.innerText = "";
    lienConnexion.innerText = "logout";
}

//ÉCOUTE ÉVÈNEMENT CLIC LIEN CONNEXION
lienConnexion.addEventListener("click", () => 
{
    if(window.localStorage.getItem("token"))
    {
        //SI L'UTILISATEUR EST AUTHENTIFIÉ, DÉCONNEXION
        deconnecterUtilisateur();
    }
});

