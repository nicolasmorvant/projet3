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

//PARAGRAPHE ERREUR INPUT PHOTO
let inputPhotoErreur = document.querySelector("#inputPhotoErreur");

//INPUT TITRE
let inputTitre = document.querySelector("#inputTitre");

//PARAGRAPHE ERREUR INPUT TITRE
let inputTitreErreur = document.querySelector("#inputTitreErreur");

//SELECT CATÉGORIE
let selectCategorie = document.querySelector("#selectCategorie");

//PARAGRAPHE ERREUR SELECT CATEGORIE
let selectCategorieErreur = document.querySelector("#selectCategorieErreur");

//BOUTON FORMULAIRE MODAL
let validerPhoto = document.querySelector("#validerPhoto");

//TOUS LES INPUT
let inputs = document.querySelectorAll("input");

//TEXTAREA
let textarea = document.querySelector("textarea");


/* FIN RÉCUPÉRATION DES ÉLÉMENTS DU DOM */



//AFFICHAGE DES TRAVAUX DU PORTFOLIO
afficherTousLesTravaux();



//SI L'UTILISATEUR EST AUTHENTIFIÉ
if (window.localStorage.getItem("token")) 
{
    //MODIFICATION DU STYLE DU LIEN LOGIN
    lienConnexion.innerText = "logout";

    //CRÉATION DU BANDEAU NOIR
    creerBandeauNoir();

    //CRÉATION DU BOUTON MODIFIER
    creerBoutonModifier();

    //ÉCOUTE ÉVÈNEMENT HOVER BOUTON
    boutonModifier.addEventListener("mouseover", () => {
        boutonModifier.style.color = "var(--main-orange)";
    });

    boutonModifier.addEventListener("mouseout", () => {
        boutonModifier.style.color = "initial";
    });

    //ÉCOUTE ÉVÈNEMENT AU CLIC DU BOUTON MODIFIER
    boutonModifier.addEventListener("click", (e) => 
    {
        e.preventDefault();

        //AFFICHAGE DE LA MODALE
        afficherModale(modale);

        //SI LA MODALE EST VISIBLE
        if(modale.classList.contains("visible"))
        {
            //ÉCOUTE CLIC SOURIS N'IMPORTE OÙ DANS LA PAGE
            document.addEventListener("click", (e) =>
            {
                //e.target = la source de l'évènement

                //SI LE CLIC EST À L'EXTÉRIEUR DE LA MODALE
                if (!boutonModifier.contains(e.target))
                {
                    if(!modale.contains(e.target)) 
                    {
                        cacherModale(modale);
                    }
                }
            });
        }
    });

    //DÉFINITION D'UNE VARIABLE POUR LA PHOTO
    let upload;

    //ÉCOUTE ÉVÈNEMENT AU CLIC DU BOUTON AJOUTER UNE PHOTO
    ajoutPhoto.addEventListener("click", (e) => 
    {
        e.preventDefault();

        upload = null;

        //AFFICHAGE DU FORMULAIRE DE LA MODALE
        afficherFormulaireModale();
    });


    //ÉCOUTE ÉVÈNEMENT AU CLIC DE L'ICONE DE FERMETURE DU MODALE
    iconeFermetureModale.addEventListener("click", () => 
    {
        upload = null;

        //FERMETURE DE LA MODALE
        cacherModale(modale);
    });


    /* FORMULAIRE ENVOI PHOTO */

        //ÉCOUTE ÉVÈNEMENT CHANGE INPUT AJOUT PHOTO

        inputDivPhoto.addEventListener("input", (e) =>
        {
            //RÉCUPÉRATION DE L'UPLOAD
            upload = e.target.files[0];

            verifierPhoto(upload, inputPhotoErreur);

            if(verifierPhoto(upload, inputPhotoErreur) && verifierTitre(inputTitre.value, inputTitreErreur) && verifierCategorie(selectCategorie.value, selectCategorieErreur))
            {
                activerBouton(validerPhoto);
            }
            else
            {
                desactiverBouton(validerPhoto);
            }
        });

        //BLUR SELECT CATEGORIE
        selectCategorie.addEventListener("blur", () => 
        {
            verifierCategorie(selectCategorie.value, selectCategorieErreur);

            if(verifierPhoto(upload, inputPhotoErreur) && verifierTitre(inputTitre.value, inputTitreErreur) && verifierCategorie(selectCategorie.value, selectCategorieErreur))
            {
                activerBouton(validerPhoto);
            }
            else
            {
                desactiverBouton(validerPhoto);
            }
        });

        //INPUT TITRE BLUR
        inputTitre.addEventListener("blur", () => 
        { 

            verifierTitre(inputTitre.value, inputTitreErreur);

            if(verifierPhoto(upload, inputPhotoErreur) && verifierTitre(inputTitre.value, inputTitreErreur) && verifierCategorie(selectCategorie.value, selectCategorieErreur))
            {
                activerBouton(validerPhoto);
            }
            else
            {
                desactiverBouton(validerPhoto);
            }
        });


        //INPUT TITRE INPUT
        inputTitre.addEventListener("input", () => 
        { 

            verifierTitre(inputTitre.value, inputTitreErreur);

            if(verifierPhoto(upload, inputPhotoErreur) && verifierTitre(inputTitre.value, inputTitreErreur) && verifierCategorie(selectCategorie.value, selectCategorieErreur))
            {
                activerBouton(validerPhoto);
            }
            else
            {
                desactiverBouton(validerPhoto);
            }
        });


        //CHANGE SELECT
        selectCategorie.addEventListener("change", () => 
        {
            verifierCategorie(selectCategorie.value, selectCategorieErreur);

            if(verifierPhoto(upload, inputPhotoErreur) && verifierTitre(inputTitre.value, inputTitreErreur) && verifierCategorie(selectCategorie.value, selectCategorieErreur))
            {
                activerBouton(validerPhoto);
            }
            else
            {
                desactiverBouton(validerPhoto);
            }
        });
         

        //ÉCOUTE ÉVÈNEMENT CLIC ENVOI DU FORMULAIRE
        validerPhoto.addEventListener("click", (e) =>
        {
            e.preventDefault();

            //CRÉATION D'UN OBJET FORMDATA
            const formData = new FormData();

            //CRÉATION DE PAIRES CLÉ-VALEUR ET AJOUT À FORM DATA
            formData.append("image", inputDivPhoto.files[0]);
            formData.append("title", inputTitre.value);
            formData.append("category", selectCategorie.value);

            //console.log(formData);

            //ENVOI DE L'OBJET FORMDATA À LA FONCTION D'ENREGISTREMENT
            enregistrerPhoto(formData);
        });

    /* FIN FORMULAIRE ENVOI PHOTO */

    //ÉCOUTE ÉVÈNEMENT CLIC RETOUR VERS LA GALERIE MODALE
    iconeRetourModale.addEventListener("click", (e) => 
    {
        e.preventDefault();

        //RESET DU FORMULAIRE AJOUT PHOTO
        effacerFormulaireAjoutPhoto();

        //AFFICHAGE DES WORK CONTAINERS
        afficherTravauxModale();
    });
}


//ÉCOUTE ÉVÈNEMENT CLIC LIEN CONNEXION
lienConnexion.addEventListener("click", () =>
{
    //SI L'UTILISATEUR EST AUTHENTIFIÉ
    if (window.localStorage.getItem("token"))
    {
        //DÉCONNEXION
        deconnecterUtilisateur();
    }
});