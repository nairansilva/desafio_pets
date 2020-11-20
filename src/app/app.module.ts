import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { OwnerComponent } from './pages/owner/owner.component';
import { PetsComponent } from './pages/pets/pets.component';
import { CreateOwnerComponent } from './pages/create-owner/create-owner.component';
import { CreatePetComponent } from './pages/create-pet/create-pet.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { UpdateOwnerComponent } from './pages/update-owner/update-owner.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdatePetComponent } from './pages/update-pet/update-pet.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { InfoOwnerComponent } from './pages/info-owner/info-owner.component';
import { InfoPetComponent } from './pages/info-pet/info-pet.component';
import { LoginComponent } from './pages/login/login.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OwnerComponent,
    PetsComponent,
    CreateOwnerComponent,
    CreatePetComponent,
    FooterComponent,
    LoadingComponent,
    UpdateOwnerComponent,
    DialogComponent,
    UpdatePetComponent,
    InfoOwnerComponent,
    InfoPetComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
