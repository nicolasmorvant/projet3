/* FORMULAIRE DE CONNEXION */

    /* RÉCUPÉRATION DES ÉLÉMENTS DU DOM */

        let lienConnexion = document.querySelector("#lienConnexion");

        let main = document.querySelector("main");

        let sectionConnexion = document.querySelector("#connexion");

        let formulaireConnexion = document.querySelector("#formulaireConnexion");

    /* FIN RÉCUPÉRATION DES ÉLÉMENTS DU DOM */

    //AJOUT DU STYLE AU LIEN DE CONNEXION
    lienConnexion.style.fontWeight = "600";

    /* FONCTIONS */

        /* FONCTIONS DE VÉRIFICATION DES CHAMPS DU FORMULAIRE */

            //DÉCLARATION DE DEUX EXPRESSIONS RÉGULIÈRES
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^[A-Za-z0-9._-]+$/;

            //FONCTION DE VÉRIFICATION DE L'ADRESSE EMAIL
            function verifierEmail(email)
            {
                if (email === "")
                {
                    afficherErreur(`Le champ ${email} est vide.`);
                    throw new Error(`Le champ ${email} est vide.`);
                }
                else
                {
                    if(emailRegex.test(email))
                    {
                        return true;
                    }
                    else
                    {
                        afficherErreur(`Le champ ${email} n'est pas valide.`);
                        throw new Error(`Le champ ${email} n'est pas valide.`);
                    }
                }
            }

            //FONCTION DE VÉRIFICATION DU MOT DE PASSE
            function verifierMotDePasse(mdp)
            {
                if (mdp === "")
                {
                    afficherErreur(`Le champ ${mdp} est vide`);
                    throw new Error(`Le champ ${mdp} est vide`);
                }
                else
                {
                    if(passwordRegex.test(mdp))
                    {
                        return true;
                    }
                    else
                    {
                        afficherErreur(`Mauvais mot de passe`);
                        throw new Error(`Mauvais mot de passe`);
                    }
                }
            }

        /* FIN FONCTIONS DE VÉRIFICATION DES CHAMPS DU FORMULAIRE */

        //FONCTION D'AFFICHAGE D'ERREUR
        function afficherErreur(msgErreur)
        {
            let blocErreur = document.querySelector("#blocErreur");

            if(!blocErreur)
            {
                blocErreur = document.createElement("p");
                blocErreur.setAttribute("id", "blocErreur");
                blocErreur.innerText = msgErreur;
                blocErreur.style.width = "50%";
                blocErreur.style.textAlign = "center";
                blocErreur.style.backgroundColor = '#B1663C';
                blocErreur.style.fontSize = "22px";
                blocErreur.style.fontWeight = "bold";
                blocErreur.style.color = "#FFFFFF";
                blocErreur.style.padding = "20px";
                blocErreur.style.margin = "0 auto";
                blocErreur.style.border = "1px solid black";

                //INSERTION DU BLOC ERREUR AVANT LA SECTION CONNEXION
                main.insertBefore(blocErreur,connexion);
            }

            blocErreur.innerText = msgErreur;
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

    /* FIN FONCTIONS */


    //SI L'UTILISATEUR EST DÉJÀ CONNECTÉ
    if(window.localStorage.getItem("token"))
    {
        lienConnexion.innerText = "";
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
        /* ENVOI DU FORMULAIRE */
            formulaireConnexion.addEventListener("submit", (e) => 
            {
                e.preventDefault();
                
                //RÉCUPÉRATION DES VALEURS DES CHAMPS DE FORMULAIRES
                let email = document.querySelector("#inputEmail").value;
                let password = document.querySelector('#inputPassword').value;

                //VÉRIFICATION DE L'EMAIL
                verifierEmail(email);

                //VÉRIFICATION DU MOT DE PASSE
                verifierMotDePasse(password);

                //TENTATIVE DE CONNEXION
                seConnecter(email,password);
            });
        /* FIN ENVOI DU FORMULAIRE */


        /* API */

            //LIEN URL CONNEXION API
            const urlApiConnexion = "http://localhost:5678/api/users/login";

            //FONCTION DE CONNEXION À L'API
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
        
                    //SI LE TOKEN EXISTE
                    if(token)
                    {   
                        //SAUVEGARDE DU TOKEN DANS LE LOCAL STORAGE
                        window.localStorage.setItem("token", token);
        
                        console.log(token);

                        //REDIRECTION VERS LA PAGE D'ACCUEIL
                        window.location.href = "index.html";
                    }
                    else
                    {
                        //ON AFFICHE UN MESSAGE D'ERREUR
                        afficherErreur("Vous ne pouvez pas vous connecter")
                    }
                }
                else
                {
                    afficherErreur(`Erreur lors de la connexion : Utilisateur inconnu`);
                    throw new Error("Erreur lors de la connexion");
                }
            }

        /* FIN API */
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
