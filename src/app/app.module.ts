import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { TaskComponent } from './pages/task/task.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MapComponent } from './pages/map/map.component';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// BootsTrap

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const firebaseConfig = {
  apiKey: "AIzaSyAHyCZLmyzo8aDkbvmsze-tmlTSkKIGmJ8",
  authDomain: "angular-web-app-fb872.firebaseapp.com",
  databaseURL: "https://angular-web-app-fb872.firebaseio.com",
  projectId: "angular-web-app-fb872",
  storageBucket: "angular-web-app-fb872.appspot.com",
  messagingSenderId: "88062172431",
  appId: "1:88062172431:web:dd98d97a3f68eadc2d327a"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    TaskComponent,
    ContactComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgbModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
