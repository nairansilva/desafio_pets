import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TarefaService, DonoService } from './shared';
import { IntroComponent } from './intro';
import { DonoComponent } from './dono/dono.component';
import { PetComponent } from './pet/pet.component';

@NgModule({
  declarations: [
    IntroComponent,
    DonoComponent,
    PetComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    TarefaService,
    DonoService
  ]
})
export class TarefasModule { }
