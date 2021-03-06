import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';
import { Collegue } from '../models/Collegue';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  // Création des variables matricule et mot de passe qui seront chargées dans le formulaire
  matricule: string;
  motDePasse: string;
  imageUrl: string;

  // Boolean pour afficher ok quand la connexion est faite
  identificationOk: boolean;

  collegueConnecte: Collegue;


  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {

    this.identificationOk = false;
    console.log(this.identificationOk)
    this._userService.prendreAbonnement().subscribe(valeurEmise => {
      this.identificationOk = valeurEmise;
    });
    console.log(this.identificationOk);

    // récupération du collegue connecté
    this._userService.prendreAbonnementCollegue().subscribe(valeurEmise => {
      this.collegueConnecte = valeurEmise;
    });
    console.log(this.collegueConnecte);


  }

  // Méthode pour utiliser usersevice et se connecter
  connexion() {
    this._userService.postAuthentification(this.matricule, this.motDePasse, this.imageUrl).subscribe(() => {
      console.log('connexion ok');
      this.identificationOk = true;
      this.router.navigate(['/galerie'])
    }, err => {
      console.log(err.message);
      return alert(`Les informations de connexion ne semblent pas correctes`)
    });
  }

  deconnexion() {
    this._userService.postLogOut().subscribe(() => {
      console.log('déconnexion ok');
      this.identificationOk = false
    });

  }

}
