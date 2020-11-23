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



const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'information-pets', component: InformationPetsComponent },
    { path: 'detail-pet', component: DetailPetsComponent }


  ];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    InformationPetsComponent,
    DetailPetsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
