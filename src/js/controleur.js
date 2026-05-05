class Controleur {

    constructor() {
        console.log("le js est prêt");
        this.candidats = Candidat.getListeInitiale(this);
    }

    initialiser() {
       for (let candidat of this.candidats) {
           document.querySelector('main').appendChild(candidat.getVue());
       }
    }
}