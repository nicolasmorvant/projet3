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


    /* FORMULAIRE ENVOI PHOTO */

        //ÉCOUTE ÉVÈNEMENT CHANGE INPUT AJOUT PHOTO
        inputDivPhoto.addEventListener("change", (e) =>
        {
            //RÉCUPÉRATION DE L'UPLOAD
            const upload = e.target.files[0];

            //VÉRIFICATION SI L'UTILISATEUR A BIEN CHOISI UN FICHIER
            if(upload)
            {
                creerApercuImageFormulairePhoto(upload);
            }
        });

        //BLUR INPUT TITRE
        inputTitre.addEventListener("blur", () => 
        {
            verifierTitre(inputTitre.value, inputTitreErreur);
        });

        //BLUR SELECT CATEGORIE
        selectCategorie.addEventListener("blur", () => 
        {
            verifierCategorie(selectCategorie.value, selectCategorieErreur);
        });

        //SUPPRESSION DES MESSAGES D'ERREUR
        inputTitre.addEventListener("input", () => 
        {
            effacerMessageErreur(inputTitreErreur);
        });

        selectCategorie.addEventListener("change", () => 
        {
            effacerMessageErreur(selectCategorieErreur);
        });


        //ÉCOUTE CHANGEMENT FORMULAIRE POUR MODIFICATION DU BOUTON D'ENVOI
        formulaireRealisation.addEventListener("change", () => 
        {
            let photo = inputDivPhoto.files[0];

            if(photo && verifierTitre(inputTitre.value, inputTitreErreur) && verifierCategorie(selectCategorie.value, selectCategorieErreur))
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
        })


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