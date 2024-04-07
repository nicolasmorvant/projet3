//URL DE L'API
const urlApi = "http://localhost:5678/api";


/* RÉCUPÉRATION DES ÉLÉMENTS DU DOM */

    //HEADER
    let mainContainer = document.querySelector("#main-container");

    //LIEN CONNEXION
    let lienConnexion = document.querySelector("#lienConnexion");

    //DIV PORTFOLIO
    let sectionPortfolio = document.querySelector("#portfolio");

    //DIV CONTENANT LES TRAVAUX
    let gallerie = document.querySelector(".gallery");

/* FIN RÉCUPÉRATION DES ÉLÉMENTS DU DOM */


/* FONCTIONS */

    //FONCTION DE FILTRAGE PAR CATÉGORIE
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

    //FONCTION POUR RÉCUPÉRER TOUS LES TRAVAUX
    function afficherTousLesTravaux(donnees)
    {
        //CRÉATION DIV MENU TRAVAUX
        let menuTravaux = document.createElement("div");

        //AJOUT D'UN ID
        menuTravaux.setAttribute("id", "menuTravaux");

        //AJOUT DU MENU TRAVAUX AVANT LA GALLERIE
        sectionPortfolio.insertBefore(menuTravaux,gallerie);

        //VARIABLE QUI VA PERMETTRE DE STOCKER LES DIFFÉRENTES CATÉGORIES DE TRAVAUX
        let categories = [];  

        //BOUCLE POUR PARCOURIR TOUS LES OBJETS DE LA LISTE
        donnees.forEach(work => {

            //console.log(work);

            //CRÉATION DES 3 ÉLÉMENTS DE LA CARD
            let figure = document.createElement("figure");
            let image = document.createElement("img");
            let figureCaption = document.createElement("figcaption");

            //SETTINGS DE L'IMAGE
            image.src = work.imageUrl;
            image.setAttribute("alt", work.title);

            //SETTINGS DE LA CAPTION
            figureCaption.innerText = work.title;

            //AJOUT DE L'IMAGE ET DE LA CAPTION À LA CARD FIGURE
            figure.appendChild(image);
            figure.appendChild(figureCaption);

            //AJOUT DE L'ID CATEGORIE A LA CARD
            figure.setAttribute("category-id", work.category.id);

            //AJOUT DE LA CARD AU CONTAINER PARENT
            gallerie.appendChild(figure);

            //RÉCUPÉRATION DE L'OBJET CATÉGORIE CONTENANT LE NOM ET L'ID DE LA CATÉGORIE
            categories.push(work.category);
        });


            //FILTRAGE DES DOUBLONS DE CATÉGORIES
            categoriesFiltrees = categories.filter( (cat, index, categories) => {

                for(let i = 0 ; i < index ; i++)
                {
                    if(categories[i].name === cat.name)
                    {
                        //console.log("i = " + i)
                        //console.log("index = " + index)
                        //console.log(cat.name);

                        return false;
                    }
                }
                return true;
            });

            //console.log(categoriesFiltrees);

            //CRÉATION DU BOUTON TOUS À INTÉGRER AU MENU
            let boutonTous = document.createElement("button");
            boutonTous.setAttribute("id", "tous");
            boutonTous.innerText = "Tous";

            //AJOUT DE LA CLASSE .selected pour le style
            boutonTous.classList.add("selected");


            //INTÉGRATION DU BOUTON TOUS
            menuTravaux.appendChild(boutonTous);


            //CRÉATION DES BOUTONS DU MENU CATÉGORIES
            categoriesFiltrees.forEach( categorie => 
            {
                //console.log(categorie);

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

    //FONCTION DE RÉCUPÉRATION DES DONNÉES
    async function recupererDonnees() 
    {
        //RÉINITIALISATION DE LA GALLERIE
        gallerie.innerHTML = "";

        try 
        {
            const response = await fetch(urlApi + "/works");
            const works = await response.json();

            //VÉRIFICATION POUR SAVOIR S'IL Y A AU MOINS UNE RÉALISATION
            if(works.length === 0)
            {
                console.log("Aucune réalisation n'a été trouvée");
                gallerie.innerHTML="<strong>Aucune réalisation n'a été trouvée</strong>";
            }
            else
            {
                afficherTousLesTravaux(works);   
            }          
        } 
        catch(error)
        {
            console.error("Impossible de récupérer les travaux : ", error);
            gallerie.innerHTML="<strong>Impossible de récupérer les travaux</strong>";
        }
    }

/* FIN FONCTIONS */


//VÉRIFICATION SI L'UTILISATEUR EST AUTHENTIFIÉ
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
    bandeau.style.fontWeight = 400;
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

    //MODIFICATION DU STYLE DU LIEN LOGIN
    lienConnexion.innerText = "";
    lienConnexion.innerText = "logout";
}

//RÉCUPÉRATION DES DONNÉES
recupererDonnees();

//ÉCOUTE ÉVÈNEMENT CLIC LIEN CONNEXION
lienConnexion.addEventListener("click", () => 
{
    if(window.localStorage.getItem("token"))
    {
        //DÉCONNEXION
        window.localStorage.removeItem("token");

        let lienConnexion = document.querySelector("#lienConnexion");
        
        lienConnexion.innerText = "";
        lienConnexion.innerText = "login";

        //REDIRECTION VERS LA PAGE D'ACCUEIL
        window.location.href = "index.html";
    }
    else
    {
        //REDIRECTION VERS LA PAGE DE CONNEXION
        window.location.href = "login.html";
    }
});


