import { Component } from '@angular/core';
import { DataService } from './services/dataService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[DataService]
})
export class AppComponent {
  title = 'collegues-facenote-Front';

  displaySideBar = 'none';

  w3_open() {
   // document.getElementById("mySidebar").style.display = "block";
   this.displaySideBar = 'block';
  }

  w3_close() {
    //document.getElementById("mySidebar").style.display = "none";
    this.displaySideBar = 'none';
  }

 }
