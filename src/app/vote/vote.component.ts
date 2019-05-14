import { Component, OnInit } from '@angular/core';
import { Collegue } from '../models/Collegue';
import { Observable } from 'rxjs';
import { DataService } from '../services/dataService';

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

  constructor(private _service: DataService) { }

  ngOnInit() {
    this.aVote = false;
    this.collegues = this._service.recupererTousColleguesLocal();
    this.collegues.subscribe(collegues => this.tabCollegues = collegues,
      error => {
        console.log(error.message);
      });
  }


  votePositif(matricule: string) {
    if (this.aVote === false) {
      this._service.getVotePositif(matricule).subscribe(() => {
        this.aVote = true;
      }, err => {
        console.log(err.message);
      });
    }
    else {
      alert('Vous avez déjà voté une fois ;)');
    }
  }

  voteNegatif(matricule: string) {
    if (this.aVote === false) {
      this._service.getVoteNegatif(matricule).subscribe(() => {
        this.aVote = true;
      }, err => {
        console.log(err.message);
      });
    }
    else {
      alert('Vous avez déjà voté une fois ;)');
    }

  }
}

