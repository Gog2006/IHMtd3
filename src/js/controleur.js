class Controleur {

    constructor() {
        console.log("le js est prêt");
        this.nbVoix = 0;
        this.nbVoixDuBulletin = 0;
        this.candidats = Candidat.getListeInitiale(this);
    }

    initialiser() {
       for (let candidat of this.candidats) {
           document.querySelector('main').appendChild(candidat.getVue());
       }
       document.querySelector("#affTV").innerHTML = "Nb voix: 0";
        let boutonMiseEnPage = document.getElementById("miseEnPage");
        boutonMiseEnPage.addEventListener("click", () => {
            let main = document.querySelector("main");
            let estEnColonne = main.classList.toggle("colonne");
            
            if (estEnColonne) {
                boutonMiseEnPage.textContent = "Passer en ligne";
            } else {
                boutonMiseEnPage.textContent = "Passer à une colonne";
            }
        });
        
    let boutonFinBulletin = document.getElementById("finBulletin");
    boutonFinBulletin.addEventListener("click", () => {
    for (let candidat of this.candidats) {
        if (candidat.isChoisi()) {
            candidat.validerChoix();
        }
    }
    this.nbVoixDuBulletin = 0;
    boutonFinBulletin.disabled = true;
    this.FinBulletin();
});

     let boutonTrier = document.getElementById("trier");
     boutonTrier.addEventListener("click", () => {
         this.candidats.forEach(candidat => candidat.ordonner());
         boutonTrier.disabled = true;
         boutonOrdreInitial.disabled = false;
     });

     let boutonOrdreInitial = document.getElementById("ordreInitial");
     boutonOrdreInitial.addEventListener("click", () => {
         this.candidats.forEach(candidat => candidat.ordreInitial());
         boutonOrdreInitial.disabled = true;
         boutonTrier.disabled = false;
     });
    }

    ajouterUneVoix(valeurVoix) {
        if (this.nbVoixDuBulletin + valeurVoix <= 5) {
            this.nbVoixDuBulletin += valeurVoix;
            if (this.nbVoixDuBulletin === 5) {
                document.getElementById("finBulletin").disabled = false;
                console.log("5 voix atteintes, bulletin complet");
            }
            return true;
        }
        return false;
    }
    
    retirerUneVoix(valeurVoix) {
        if (this.nbVoixDuBulletin > 0) {
            this.nbVoixDuBulletin -= valeurVoix;
            if (this.nbVoixDuBulletin < 5) {
                document.getElementById("finBulletin").disabled = true;
            }
            console.log("Voix retirée, bulletin incomplet (" + this.nbVoixDuBulletin + "/5)");
        }
    }
    FinBulletin() {
    var totalVoixBulletin = 0;
    for (var candidat of this.candidats) {
        totalVoixBulletin += candidat.getNbVoix() * candidat.getValeurVoix();
    }
    console.log("Bulletin validé, total voix: " + totalVoixBulletin);
    document.querySelector("#affTV").innerHTML = "Nb voix: " + totalVoixBulletin;
}
    }