import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Pet } from './../../model/pet.model';
import { PetsDialogInfoComponent } from './../pets-dialog-info/pets-dialog-info.component';
import { PetsDialogConfirmComponent } from './../pets-dialog-confirm/pets-dialog-confirm.component';
import { PetsDetailComponent } from '../pets-detail/pets-detail.component';
import { PetsService } from 'src/app/services/pets.service';

@Component({
  selector: 'app-pets-card',
  templateUrl: './pets-card.component.html',
  styleUrls: ['./pets-card.component.scss']
})
export class PetsCardComponent implements OnInit {

  @Input() petInfo: Pet;
  @Output() petEmitter = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private petsService: PetsService
    ) { }

  ngOnInit() {
  }

  edit(): void {
    const dialogRef = this.dialog.open(PetsDialogInfoComponent, {
      data: this.petInfo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.petEmitter.emit(true);
      }
    });
  }

  delete(): void {
    const dialogRef = this.dialog.open(PetsDialogConfirmComponent, { });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePet(dialogRef);
      }
    });
  }

  deletePet(dialogRef): void {
    this.petsService.delete(this.petInfo.id).subscribe(
      value => {
        this.petEmitter.emit(true);
        console.log('DELETE SUCCESS', value);
      }
    );
  }

  detail(): void {
    const dialogRef = this.dialog.open(PetsDetailComponent, {
      data: this.petInfo
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('FECHOU DETALHES')
      }
    });
  }

}
