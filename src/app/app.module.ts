import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CollegueComponent } from './collegue/collegue.component';
import { GallerieComponent } from './gallerie/gallerie.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthentificationComponent } from './authentification/authentification.component';
import { VoteComponent } from './vote/vote.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { FormsModule } from '@angular/forms';
import { ClassementComponent } from './classement/classement.component';

@NgModule({
  declarations: [
    AppComponent,
    CollegueComponent,
    GallerieComponent,
    AuthentificationComponent,
    VoteComponent,
    ClassementComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(ROUTES), NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
