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



//AFFICHAGE DES TRAVAUX DU PORTFOLIO
afficherTousLesTravaux();



//SI L'UTILISATEUR EST AUTHENTIFIÉ
if(window.localStorage.getItem("token"))
{       
    //MODIFICATION DU STYLE DU LIEN LOGIN
    lienConnexion.innerText = "logout";

    //CRÉATION DU BANDEAU NOIR
    creerBandeauNoir();

    //CRÉATION DU BOUTON MODIFIER
    creerBoutonModifier();

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