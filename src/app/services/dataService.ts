import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs'
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Collegue } from '../models/Collegue';
import { text } from '@angular/core/src/render3';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Liste collègues pour cache
  listeColleguesService: Collegue[] = [];

  URL_BACKEND = environment.backendUrl;

  constructor(private _http: HttpClient) {
  }

  // Méthode pour afficher tous les collègues de la base distante
  recupererTousColleguesDistants(): Observable<Collegue[]> {
    // On remet à zéro le tableau sinon à chaque recher il enlèvera pas les recherches précédentes
    this.listeColleguesService = [];

    let url: string = this.URL_BACKEND
    url += "/all";
    console.log(url);
    return this._http.get<Collegue[]>(url, {
      withCredentials: true,
    }).pipe(
      map(collegueTab => {
        for (let collegue of collegueTab) {
          this.listeColleguesService.push(collegue);
        }
        console.log('Nombre de collègues : ' + this.listeColleguesService.length);
        return this.listeColleguesService;
      }));

  }

  // Méthode pour afficher tous les collègues de la base locale
  recupererTousColleguesLocal(): Observable<Collegue[]> {
    // On remet à zéro le tableau sinon à chaque recher il enlèvera pas les recherches précédentes
    this.listeColleguesService = [];

    let url: string = this.URL_BACKEND;
    url += '/players';
    console.log(url);
    return this._http.get<Collegue[]>(url, {
      withCredentials: true,
    }).pipe(
      map(collegueTab => {
        for (let collegue of collegueTab) {
          this.listeColleguesService.push(collegue);
        }
        console.log('Nombre de collègues : ' + this.listeColleguesService.length);
        return this.listeColleguesService;
      }));

  }

  postVotePositif(matriculeCollegue: string, matriculeVotant: string): Observable<string> {
    let url: string = this.URL_BACKEND;
    url += '/vote/';
    console.log(url);
    return this._http.post(url, {
      "matriculeVotant": matriculeVotant,
      "matriculeCollegue": matriculeCollegue,
      "choixVote": "YES"
    }, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        responseType: 'text',
        withCredentials: true
      }).pipe(tap(() => {
        console.log('a voté une fois');
      }));
  }

  postVoteNegatif(matriculeCollegue: string, matriculeVotant: string): Observable<string> {
    let url: string = this.URL_BACKEND;
    url += '/vote/';
    console.log(url);
    return this._http.post(url, {
      "matriculeVotant": matriculeVotant,
      "matriculeCollegue": matriculeCollegue,
      "choixVote": 'NO'
    }, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        responseType: 'text',
        withCredentials: true
      }).pipe(tap(() => {
        console.log('a voté une fois');
      }));
  }


}
