import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

import { OwnerCardComponent } from './owner-card/owner-card.component';
import { OwnerComponent } from './owner.component';
import { OwnerDetailComponent } from './owner-detail/owner-detail.component';
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
    MatDividerModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    OwnerRoutingModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
  ],
  declarations: [
    OwnerCardComponent,
    OwnerComponent,
    OwnerDetailComponent,
    OwnerDialogConfirmComponent,
    OwnerDialogInfoComponent
  ],
  providers: [
    OwnerService
  ]
})
export class OwnerModule { }
