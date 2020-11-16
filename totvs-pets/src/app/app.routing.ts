import {  Routes } from "@angular/router";
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { OwnersComponent } from './pages/owners/owners.component';
import { PetsComponent } from './pages/pets/pets.component';
import { AuthGuardRouterLoggedService } from './services/auth-guard-router-logged.service';
import { AuthGuardRouterService } from './services/auth-guard-router.service';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[AuthGuardRouterLoggedService]
  },
  {
    path: 'owners',
    component: OwnersComponent,
    canActivate:[AuthGuardRouterService]
  },
  {
    path: 'pets',
    component: PetsComponent,
    canActivate:[AuthGuardRouterService]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate:[AuthGuardRouterService]
  },
  {
    path: '',
    redirectTo: '/owners',
    pathMatch: 'full'
  }
];

export default appRoutes;
