import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroDonosComponent } from './components/cadastro-donos/cadastro-donos.component';
import { CadastroPetsComponent } from './components/cadastro-pets/cadastro-pets.component';
import { HomeComponent } from './components/home/home.component';
import { ListaPetsComponent } from './components/lista-pets/lista-pets.component';
import { PerfilDonosComponent } from './components/perfil-donos/perfil-donos.component';
import { PerfilPetsComponent } from './components/perfil-pets/perfil-pets.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cadastro-donos',
    component: CadastroDonosComponent
  },
  {
    path: 'cadastro-pets',
    component: CadastroPetsComponent
  },
  {
    path: 'lista-pets',
    component: ListaPetsComponent
  },
  {
    path: 'perfil-pets',
    component: PerfilPetsComponent
  },
  {
    path: 'perfil-donos',
    component: PerfilDonosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
