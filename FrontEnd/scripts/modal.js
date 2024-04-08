/* FONCTION D'AFFICHAGE DE LA MODAL */

    function afficherModal()
    {
        //CRÉATION DE LA MODAL
        let modal = document.createElement("div");
        div.setAttribute("id", "modal");

        //AJOUT DU STYLE DE LA MODAL
        modal.style.display = "flex";
        modal.style.flexDirection = "column";
        modal.style.alignItems = "center";
        modal.style.width = "630px";
        modal.style.heigth = "688px";
        modal.style.backgroundColor = "#FFFFFF";


        //CRÉATION DES ÉLÉMENTS DU MODAL

            //TITRE
            let titre = document.createElement("h3");
            titre.style.lineHeight = "30px";
            titre.style.fontSize = "26px";
            titre.style.fontWeight = "400";

            //DIV GALLERIE PHOTOS
            let galleriePhotos = document.createElement("div");
            galleriePhotos.style.borderBottom = "1px solid #B3B3B3";

            //BOUTON AJOUTER
            let boutonAjouter = document.createElement("button");
            boutonAjouter.innerText = "Ajouter une photo";

            
        //AJOUT DES ÉLÉMENTS AU MODAL
        modal.appendChild(titre);
        modal.appendChild(galleriePhotos);
        modal.appendChild(boutonAjouter);

        //AFFICHAGE DU MODAL
        modal.display = "block";
    }

/* FIN FONCTION D'AFFICHAGE DE LA MODAL */