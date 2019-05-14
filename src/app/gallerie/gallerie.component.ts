import { Component, OnInit } from '@angular/core';
import { Collegue } from '../models/Collegue';
import { DataService } from '../services/dataService';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallerie',
  templateUrl: './gallerie.component.html',
  styleUrls: ['./gallerie.component.css']
})
export class GallerieComponent implements OnInit {
  tabCollegues: Collegue[] = new Array();
  collegues: Observable<Collegue[]>;

  constructor(private _service: DataService) { }

  ngOnInit() {
    this.collegues = this._service.recupererTousColleguesDistants();
    this.collegues.subscribe(collegues => this.tabCollegues = collegues,
      error => {
        console.log(error.message);
      });
  }
}
