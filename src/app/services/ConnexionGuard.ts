import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthentificationComponent } from '../authentification/authentification.component';
import { UserService } from './UserService';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnexionGuard implements CanActivate {


  constructor(private router: Router, private _userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    // retourne `true` si l'utilisateur est connecté ou redirige vers la page de /auth
    return this._userService.getCollegueCookie().pipe(
      map(col => true),
      catchError(err => of(this.router.parseUrl('/login')))
    );
  }
}
