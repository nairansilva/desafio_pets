import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { PetsComponent } from './pets.component';
import { PetsCardComponent } from './pets-card/pets-card.component';
import { PetsDialogInfoComponent } from './pets-dialog-info/pets-dialog-info.component';
import { PetsRoutingModule } from './pets-routing.module';
import { PetsService } from './../services/pets.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    PetsRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PetsComponent,
    PetsCardComponent,
    PetsDialogInfoComponent
  ],
  providers: [PetsService]
})
export class PetsModule { }
