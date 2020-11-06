import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CadastroDonosComponent } from './components/cadastro-donos/cadastro-donos.component';
import { CadastroPetsComponent } from './components/cadastro-pets/cadastro-pets.component';
import { ListaPetsComponent } from './components/lista-pets/lista-pets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { PoModule } from '@po-ui/ng-components';
import { HomeComponent } from './components/home/home.component';
import { PerfilDonosComponent } from './components/perfil-donos/perfil-donos.component';
import { PerfilPetsComponent } from './components/perfil-pets/perfil-pets.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroDonosComponent,
    CadastroPetsComponent,
    ListaPetsComponent,
    HomeComponent,
    PerfilDonosComponent,
    PerfilPetsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PoModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
