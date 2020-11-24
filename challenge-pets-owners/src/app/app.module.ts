import {FormsModule} from '@angular/forms';
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
import { CreateOwnersComponent } from './Pages/create-owners/create-owners/create-owners.component';
import { InformationOwnersComponent } from './Pages/information-owners/information-owners/information-owners.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'information-pets', component: InformationPetsComponent },
  { path: 'detail-pet', component: DetailPetsComponent },
  { path: 'create-pet', component: CreatePetsComponent },
  { path: 'update-pet', component: UpdatePetsComponent },
  { path: 'information-owners', component: InformationOwnersComponent },
  { path: 'create-owners', component: CreateOwnersComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    InformationPetsComponent,
    DetailPetsComponent,
    UpdatePetsComponent,
    CreatePetsComponent,
    InformationOwnersComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    MatSliderModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
