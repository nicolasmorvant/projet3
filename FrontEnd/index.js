//URL DE L'API
const urlApi = "http://localhost:5678/api/";


/* RÉCUPÉRATION DES ÉLÉMENTS DU DOM */

    //DIV MENU TRAVAUX
    let menuTravaux = document.querySelector("#menuTravaux");

    //DIV CONTENANT LES TRAVAUX
    let gallerie = document.querySelector(".gallery");





/* FONCTIONS */


    //FONCTION DE RÉCUPÉRATION DES TRAVAUX
    async function afficherTousLesTravaux() 
    {
        try 
        {
            const response = await fetch(urlApi + "works");
            const works = await response.json();


            //VÉRIFICATION POUR SAVOIR S'IL Y A AU MOINS UNE RÉALISATION
            if(works.length === 0)
            {
                console.log("Aucune réalisation n'a été trouvé");
            }
            else
            {
                //VARIABLE QUI VA PERMETTRE DE STOCKER LES DIFFÉRENTES CATÉGORIES DE TRAVAUX
                let categories = [];  

                //BOUCLE POUR PARCOURIR TOUS LES OBJETS DE LA LISTE
                works.forEach(work => {

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

                    //AJOUT DE LA CARD AU CONTAINER PARENT
                    gallerie.appendChild(figure);

                    //RÉCUPÉRATION DE L'OBJET CATÉGORIE CONTENANT LE NOM ET L'ID DE LA CATÉGORIE
                    categories.push(work.category);
                })

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

                } )

                //console.log(categoriesFiltrees);

                //CRÉATION DU BOUTON TOUS À INTÉGRER AU MENU
                let tous = document.createElement("button");
                tous.setAttribute("id", "tous");
                tous.innerText = "Tous"


                //INTÉGRATION DU BOUTON TOUS
                menuTravaux.appendChild(tous);


                //CRÉATION DES BOUTONS DU MENU CATÉGORIES
                categoriesFiltrees.forEach( categorie => {

                    //console.log(categorie);

                    //CRÉATION DU BOUTON
                    let boutonCategorie = document.createElement("button");


                    //MODIFICATION DU NOM DE LA CATÉGORIE POUR LA CRÉATION DE L'ID

                    /* " - " et " & " doivent être remplacés par un tiret "-" */

                    let regex = / - | & /g;     // / = début de la regex, | pour le ou,  et /g pour global

                    let nomCategorie = categorie.name.replace(regex, '-');

                    nomCategorie = nomCategorie.toLowerCase();

                    //console.log(nomCategorie);


                    //SETTINGS DU BOUTON
                    boutonCategorie.setAttribute("id", nomCategorie);
                    boutonCategorie.innerText = categorie.name;         

                    menuTravaux.appendChild(boutonCategorie);

                }) 

            }

                       
        } 
        catch(error)
        {
            console.error("Impossible de récupérer les travaux : ", error);
        }
    }





//APPEL DE LA FONCTION POUR RÉCUPÉRER LES TRAVAUX
afficherTousLesTravaux();






/*
    TEST

    let bouton = document.querySelector("#testWorks");

    bouton.addEventListener("click", (e) => {

        e.preventDefault();

        console.log(afficherTousLesTravaux());

    })
*/