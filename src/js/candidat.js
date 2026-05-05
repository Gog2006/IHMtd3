class Candidat {
    static getListeInitiale (ctrl) {
            let listeNomCandidats = ["Monkey D.Luffy", "Natsu Dragnir", "Astérix",
            "Tintin", "Largo Winch", "Rin Okumura", "Lucky Luke", "Eren Yeager",
            "Gon Freecss", "Mickey Mouse", "VOTE BLANC", "VOTE NUL"];
            let nomCandidats = [];
            
            for (let nom of listeNomCandidats) {
                let candidat = new Candidat(nom,ctrl);;
                candidat.genererVue();
                nomCandidats.push(candidat);
            }

            return nomCandidats;
    }
    constructor (nom, ctrl) {
    this.nomCandidat = nom;
    this.controleur = ctrl;
    this.nbVoix = 0;
    }

    genererVue() {
        const template = document.querySelector("template");
        this.vue = document.importNode(template.content, true).querySelector("div");
        this.vue.querySelector("span.texte").innerHTML = this.nomCandidat;
        this.vue.querySelector("span.valeur").innerHTML = this.nbVoix;
        let span = this.vue.querySelector("span.valeur");
        let classes = span.classList;
        span.addEventListener("click", () => {
            let nbVoix = parseInt(span.innerHTML);
            nbVoix++;
            span.innerHTML = "" + nbVoix;
            this.nbVoix = nbVoix;
        });
    }

    getVue() {
        return this.vue;
    }
   
}