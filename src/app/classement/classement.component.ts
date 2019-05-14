import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataService';
import { Observable } from 'rxjs';
import { Collegue } from '../models/Collegue';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent implements OnInit {
  tabCollegues: Collegue[] = new Array();
  collegues: Observable<Collegue[]>;

  constructor(private _service: DataService) { }

  ngOnInit() {
    this.collegues = this._service.recupererTousColleguesLocal();
    this.collegues.subscribe(collegues => this.tabCollegues = collegues,
      error => {
        console.log(error.message);
      });
  }
}
