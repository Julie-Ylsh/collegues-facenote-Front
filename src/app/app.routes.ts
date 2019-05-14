import { Routes } from '@angular/router';
import { ConnexionGuard } from './services/ConnexionGuard';
import { AuthentificationComponent } from './authentification/authentification.component';
import { GallerieComponent } from './gallerie/gallerie.component';
import { VoteComponent } from './vote/vote.component';
import { ClassementComponent } from './classement/classement.component';


export const ROUTES: Routes = [
  { path: 'login', component: AuthentificationComponent },
  { path: 'galerie', component: GallerieComponent },
  {
    path: '',
    canActivate: [ConnexionGuard],
    children: [
      { path: 'classement', component: ClassementComponent },
      { path: 'vote', component: VoteComponent },
      { path: '', pathMatch: 'full', redirectTo: '/login' },
    ]
  },


];
