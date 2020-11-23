import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/Login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InformationPetsComponent } from './Pages/information-pets/information-pets/information-pets.component';
import { DetailPetsComponent } from './Pages/detail-pets/detail-pets/detail-pets.component';
import { UpdatePetsComponent } from './Pages/update-pets/update-pets.component';
import { CreatePetsComponent } from './Pages/create-pets/create-pets/create-pets.component';

import { FormsModule }   from '@angular/forms';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'information-pets', component: InformationPetsComponent },
    { path: 'detail-pet', component: DetailPetsComponent },
    { path: 'create-pet', component: CreatePetsComponent }



  ];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    InformationPetsComponent,
    DetailPetsComponent,
    UpdatePetsComponent,
    CreatePetsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
