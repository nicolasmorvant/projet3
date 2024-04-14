/* FORMULAIRE DE CONNEXION */

    /* RÉCUPÉRATION DES ÉLÉMENTS DU DOM */

        let lienConnexion = document.querySelector("#lienConnexion");

        let main = document.querySelector("main");

        let sectionConnexion = document.querySelector("#connexion");

        let formulaireConnexion = document.querySelector("#formulaireConnexion");

        let inputEmail = document.querySelector("#inputEmail");

        let inputPassword = document.querySelector("#inputPassword");

        let inputEmailErreur = document.querySelector("#inputEmailErreur");

        let inputPasswordErreur = document.querySelector("#inputPasswordErreur");

    /* FIN RÉCUPÉRATION DES ÉLÉMENTS DU DOM */


    //AJOUT DU STYLE AU LIEN DE CONNEXION
    lienConnexion.style.fontWeight = "600";


    //SI L'UTILISATEUR EST DÉJÀ CONNECTÉ
    if(window.localStorage.getItem("token"))
    {
        //MODIFICATION DU STYLE DU LIEN LOGIN
        lienConnexion.innerText = "logout";

        //ON CACHE LE FORMULAIRE DE CONNEXION
        sectionConnexion.style.display = "none";

        //ON CRÉE UNE DIV AVEC UN MESSAGE ET UN LIEN DE REDIRECTION VERS LA PAGE D'ACCUEIL (PROJETS)
        let dejaConnecte = document.createElement("div");

        let messageConnecte = document.createElement("strong");
        messageConnecte.innerText = "Vous êtes déjà connecté(e).";

        let lienAccueil = document.createElement("a");
        lienAccueil.setAttribute("href", "index.html");
        lienAccueil.innerText = "Page d'accueil";
        lienAccueil.style.marginTop = "30px";
        lienAccueil.style.color = "var(--main-green)";
        lienAccueil.style.textDecoration = "underline";

        dejaConnecte.style.fontSize = "20px";

        dejaConnecte.appendChild(messageConnecte);
        dejaConnecte.appendChild(lienAccueil);

        dejaConnecte.style.display = "flex";
        dejaConnecte.style.flexDirection = "column";
        dejaConnecte.style.alignItems = "center";

        //INSERTION DE LA DIV DANS LE MAIN
        main.appendChild(dejaConnecte);


        //CHANGEMENT DE COULEUR AU SURVOL DU LIEN
        lienAccueil.addEventListener("mouseover", () => 
        {
            lienAccueil.style.color = "var(--main-orange)";
        });

        lienAccueil.addEventListener("mouseleave", () => 
        {
            lienAccueil.style.color = "var(--main-green)";
        });
    }
    //L'UTILISATEUR N'EST PAS CONNECTÉ
    else
    {
        //ÉCOUTE ÉVÈNEMENT PERTE FOCUS INPUTS
        inputEmail.addEventListener("blur", () => 
        {
            verifierEmail(inputEmail.value, inputEmailErreur);
        });

        inputPassword.addEventListener("blur", () => 
        {
            verifierMotDePasse(inputPassword.value, inputPasswordErreur);
        });

        //SUPPRESSION DES MESSAGES D'ERREUR
        inputEmail.addEventListener("input", () => 
        {
            effacerMessageErreur(inputEmailErreur);
        });

        inputPassword.addEventListener("input", () => 
        {
            effacerMessageErreur(inputPasswordErreur);
        });

        /* ENVOI DU FORMULAIRE */
            formulaireConnexion.addEventListener("submit", (e) => 
            {
                e.preventDefault();

                //VÉRIFICATION DE L'EMAIL ET DU MOT DE PASSE
                if(verifierEmail(inputEmail.value, inputEmailErreur) && verifierMotDePasse(inputPassword.value, inputPasswordErreur))
                {
                    //TENTATIVE DE CONNEXION
                    seConnecter(inputEmail.value, inputPassword.value);
                }
            });
        /* FIN ENVOI DU FORMULAIRE */
    }


    //ÉCOUTE ÉVÈNEMENT CLIC LIEN DÉCONNEXION
    lienConnexion.addEventListener("click", () => 
    {
        if(window.localStorage.getItem("token"))
        {
            //SI L'UTILISATEUR EST AUTHENTIFIÉ, DÉCONNEXION
            deconnecterUtilisateur();
        }
        else
        {
            //SINON REDIRECTION POUR SE CONNECTER
            window.location.href = "login.html";
        }
    });
