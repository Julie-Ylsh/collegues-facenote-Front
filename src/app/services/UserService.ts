import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Collegue } from '../models/Collegue';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collegueConnecte: Collegue;

  URL_BACKEND = environment.backendUrl;

  constructor(private _http: HttpClient) {
    this.methodeCookie();
  }

  private subjectIdentificationOk = new BehaviorSubject<boolean>(false);
  private subjectCollegue = new BehaviorSubject<Collegue>(this.collegueConnecte);

  ngOnInit(): void {
  }

  // Récupérer un collègue avec le cookie
  getCollegueCookie(): Observable<Collegue> {
    let url: string = this.URL_BACKEND
    url += "/me";
    console.log(url);
    return this._http.get<Collegue>(url, {
      withCredentials: true
    });
  }

  // méthode pour invoquer getCookie et appliquer les subscribe dessus
  methodeCookie() {
    this.getCollegueCookie().subscribe((col) => {
      this.collegueConnecte = col;
      console.log('cookie ok');
      this.subjectIdentificationOk.next(true);
      this.subjectCollegue.next(this.collegueConnecte);
    }, err => {
      console.log(err.message + ' - pas de cookie');
      this.subjectIdentificationOk.next(false);
    });
  }

  // Méthode pour se connecter
  postAuthentification(username: string, password: string, imgUrl?: string): Observable<string> {
    let url: string = this.URL_BACKEND;
    url += '/login';
    return this._http.post(url, {
      "matriculeCollegue": username,
      "motDePasse": password,
      "urlPhoto": imgUrl,
    }, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        responseType: 'text',
        withCredentials: true
      }).pipe(tap(() => {
        this.subjectIdentificationOk.next(true);
        this.methodeCookie();
      }));
  }


  // Méthode pour se déconnecter
  postLogOut(): Observable<string> {
    let url: string = this.URL_BACKEND;
    url += '/logout';
    return this._http.post(url, {}, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      responseType: 'text',
      withCredentials: true
    }).pipe(tap(() => {
      this.subjectIdentificationOk.next(false);
      console.log('deconnexion Ok');
    }));
  }


  // Abonnement au subject
  prendreAbonnement(): Observable<boolean> {
    return this.subjectIdentificationOk.asObservable();
  }

  prendreAbonnementCollegue(): Observable<Collegue> {
    return this.subjectCollegue.asObservable();
  }

}
