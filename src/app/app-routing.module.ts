import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOwnerComponent } from './pages/create-owner/create-owner.component';
import { CreatePetComponent } from './pages/create-pet/create-pet.component';
import { InfoOwnerComponent } from './pages/info-owner/info-owner.component';
import { InfoPetComponent } from './pages/info-pet/info-pet.component';
import { LoginComponent } from './pages/login/login.component';
import { OwnerComponent } from './pages/owner/owner.component';
import { PetsComponent } from './pages/pets/pets.component';
import { UpdateOwnerComponent } from './pages/update-owner/update-owner.component';
import { UpdatePetComponent } from './pages/update-pet/update-pet.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'owner',
    component: OwnerComponent
  },
  {
    path: 'owner/new',
    component: CreateOwnerComponent
  },
  {
    path: 'owner/edit/:id',
    component: UpdateOwnerComponent
  },
  {
    path: 'owner/info/:id',
    component: InfoOwnerComponent
  },
  {
    path: 'pet',
    component: PetsComponent
  },
  {
    path: 'pet/new',
    component: CreatePetComponent
  },
  {
    path: 'pet/edit/:id',
    component: UpdatePetComponent
  },
  {
    path: 'pet/info/:id',
    component: InfoPetComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
