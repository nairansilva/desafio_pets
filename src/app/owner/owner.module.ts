import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { OwnerCardComponent } from './owner-card/owner-card.component';
import { OwnerComponent } from './owner.component';
import { OwnerDialogConfirmComponent } from './owner-dialog-confirm/owner-dialog-confirm.component';
import { OwnerDialogInfoComponent } from './owner-dialog-info/owner-dialog-info.component';
import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerService } from '../services/owner.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    OwnerRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    OwnerCardComponent,
    OwnerComponent,
    OwnerDialogConfirmComponent,
    OwnerDialogInfoComponent
  ],
  providers: [
    OwnerService
  ]
})
export class OwnerModule { }
