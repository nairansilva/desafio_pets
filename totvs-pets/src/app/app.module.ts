import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import routes from './app.routing'
import { AuthGuardRouterService } from './services/auth-guard-router.service';
import { LocalStorageService } from './services/local-storage.service';
import { JwtTokenService } from './services/jwt-token.service';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { OwnersComponent } from './pages/owners/owners.component';
import { MenuComponent } from './pages/layout/menu/menu.component';
import { SortColumnComponent } from './components/sort-column/sort-column.component';
import { OrderPipe } from './pipes/order.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalDynamicComponent } from './components/modal-dynamic/modal-dynamic/modal-dynamic.component';
import { ModalContentDirective } from './components/modal-dynamic/modal-content.directive';
import { ModalTitleComponent } from './components/modal-dynamic/modal-title/modal-title.component';
import { ModalBodyComponent } from './components/modal-dynamic/modal-body/modal-body.component';
import { ModalFooterComponent } from './components/modal-dynamic/modal-footer/modal-footer.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NewModalComponent } from './pages/owners/new-modal/new-modal.component';
import { EditModalComponent } from './pages/owners/edit-modal/edit-modal.component';
import { DeleteModalComponent } from './pages/owners/delete-modal/delete-modal.component';
import { CreatePetModal } from './pages/owners/create-pet-modal/create-pet-modal.component';
import { DeletePetModalComponent } from './pages/owners/delete-pet-modal/delete-pet-modal.component';
import { EditPetModalComponent } from './pages/owners/edit-pet-modal/edit-pet-modal.component';
import { PetsComponent } from './pages/pets/pets.component';
import { AuthGuardRouterLoggedService } from './services/auth-guard-router-logged.service';
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    OwnersComponent,
    MenuComponent,
    SortColumnComponent,
    OrderPipe,
    ModalDynamicComponent,
    ModalContentDirective,
    ModalTitleComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    InputSearchComponent,
    NewModalComponent,
    EditModalComponent,
    DeleteModalComponent,
    CreatePetModal,
    DeletePetModalComponent,
    EditPetModalComponent,
    PetsComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes),
    NgxMaskModule.forRoot(maskConfig),
  ],
  entryComponents:[
    ModalDynamicComponent,
    NewModalComponent,
    EditModalComponent,
    DeleteModalComponent,
    CreatePetModal,
    DeletePetModalComponent
  ],
  providers: [
    AuthGuardRouterService,
    LocalStorageService,
    JwtTokenService,
    AuthService,
    AuthGuardRouterLoggedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
