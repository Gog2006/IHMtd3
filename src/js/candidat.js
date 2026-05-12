class Candidat {
    static getListeInitiale (ctrl) {
            let listeNomCandidats = ["Monkey D.Luffy", "Natsu Dragnir", "Astérix",
            "Tintin", "Largo Winch", "Rin Okumura", "Lucky Luke", "Eren Yeager",
            "Gon Freecss", "Mickey Mouse", "VOTE BLANC", "VOTE NUL"];
            let nomCandidats = [];

            for (let i = 0; i < listeNomCandidats.length - 2; i++) {
                let candidat = new Candidat(listeNomCandidats[i], ctrl);
                candidat.genererVue();
                nomCandidats.push(candidat); 
            }
            for (let i = listeNomCandidats.length - 2; i < listeNomCandidats.length; i++) {
                let candidat = new CandidatSpecial(listeNomCandidats[i], ctrl);
                candidat.genererVue();
                nomCandidats.push(candidat); 
            }

            return nomCandidats;
    }
    
    constructor (nom, ctrl) {
        this.nomCandidat = nom;
        this.controleur = ctrl;
        this.nbVoix = 0;
        this.aRecuUneVoix = false;
    }

    genererVue() {
        const template = document.querySelector("template");
        this.vue = document.importNode(template.content, true).querySelector("div");
        this.vue.querySelector("span.texte").innerHTML = this.nomCandidat;
        this.afficherNbVoix();
        let span = this.vue.querySelector("span.valeur");
        span.innerHTML = this.nbVoix;

        this.vue.addEventListener("click", () => {
           if (!this.aRecuUneVoix) {
                if (this.controleur.ajouterUneVoix(this.getValeurVoix())) {
                    this.aRecuUneVoix = true;
                    this.afficherNbVoix();
                    this.vue.classList.add("selected");
                    this.vue.classList.add("vote");
                    let minusButton = this.vue.querySelector("button.moins");
                    minusButton.disabled = false;
                    console.log("vote enregistré pour " + this.nomCandidat + " (" + this.getValeurVoix() + " voix)");
                } else {
                    console.log("vote non enregistré, limite de 5 voix atteinte");
                }
            } else {
                console.log("voix déjà reçue, clic non pris en compte");
            }
        });

        let minusButton = this.vue.querySelector("button.moins");
        minusButton.addEventListener("click", (event) => {
            event.stopPropagation();
            if (this.aRecuUneVoix) {
                this.aRecuUneVoix = false;
                this.vue.classList.remove("vote");
                this.vue.classList.remove("selected");
                this.afficherNbVoix();
                minusButton.disabled = true;
                this.controleur.retirerUneVoix(this.getValeurVoix());
            } else {
                console.log("aucune voix reçue, clic non pris en compte");
            }
        });
    }

    afficherNbVoix() {
        let span = this.vue.querySelector("span.valeur");
        if (this.aRecuUneVoix) {
            span.innerHTML = this.nbVoix + "+1";
        } else {
            span.innerHTML = this.nbVoix;
        }
    }
    
    getValeurVoix() {
        return 1;
    }
    
    isChoisi() {
        return this.aRecuUneVoix;
    }
    
    validerChoix() {
        this.nbVoix++;
        this.aRecuUneVoix = false;
        this.afficherNbVoix();
        this.vue.classList.remove("selected");
        this.vue.classList.remove("vote");
        let minusButton = this.vue.querySelector("button.moins");
        minusButton.disabled = true;
    }
    getNbVoix() {
        return this.nbVoix;
    }
    ordonner() {
        this.vue.style.order = -this.nbVoix;
    }

    ordreInitial() {
        this.vue.style.order = "";
    }
    getVue() {
        return this.vue;
    }
}