import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

import { PetsComponent } from './pets.component';
import { PetsCardComponent } from './pets-card/pets-card.component';
import { PetsDialogInfoComponent } from './pets-dialog-info/pets-dialog-info.component';
import { PetsDialogConfirmComponent } from './pets-dialog-confirm/pets-dialog-confirm.component';
import { PetsDetailComponent } from './pets-detail/pets-detail.component';
import { PetsRoutingModule } from './pets-routing.module';
import { PetsService } from './../services/pets.service';
import { OwnerService } from '../services/owner.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    NgxMaskModule.forRoot(),
    PetsRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PetsComponent,
    PetsCardComponent,
    PetsDetailComponent,
    PetsDialogConfirmComponent,
    PetsDialogInfoComponent
  ],
  providers: [
    PetsService,
    OwnerService
  ]
})
export class PetsModule { }
