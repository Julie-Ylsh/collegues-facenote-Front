import { Component, OnInit } from '@angular/core';
import { Collegue } from '../models/Collegue';
import { Observable } from 'rxjs';
import { DataService } from '../services/dataService';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  tabCollegues: Collegue[] = new Array();
  collegues: Observable<Collegue[]>;

  // Boolean a voté pour ne pas qu'il revote plusieurs fois le petit fripon
  aVote: boolean = false;

  model = {
    left: true,
    middle: false,
    right: false
  };

  constructor(private _service: DataService, private _userService: UserService) { }

  ngOnInit() {
    this.aVote = false;
    this.collegues = this._service.recupererTousColleguesLocal();
    this.collegues.subscribe(collegues => this.tabCollegues = collegues,
      error => {
        console.log(error.message);
      });
  }


  votePositif(matriculeVotant: string) {
    if (this._userService.collegueConnecte.matricule === matriculeVotant) {
      alert('Et bien alors, on essaye de voter pour soi-même ?');

    } else if (this.aVote === false) {
      this._service.postVotePositif(this._userService.collegueConnecte.matricule, matriculeVotant).subscribe(() => {
        this.aVote = true;
      }, err => {
        console.log(err.message);
      });
    } else if (this.aVote === true) {
      alert('Vous avez déjà voté une fois ;)');
    }

    console.log(this.aVote);
  }

  voteNegatif(matriculeCollegue: string, matriculeVotant: string) {
    if (this._userService.collegueConnecte.matricule === matriculeVotant) {
      alert('Et bien alors, on essaye de voter pour soi-même ?');
    } else if (this.aVote === false) {
      this._service.postVoteNegatif(matriculeCollegue, matriculeVotant).subscribe(() => {
        this.aVote = true;
      }, err => {
        console.log(err.message);
      });
    } else if (this.aVote === true) {
      alert('Vous avez déjà voté une fois ;)');
    }

  }
}

