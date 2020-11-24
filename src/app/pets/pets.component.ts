import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PetsService } from '../services/pets.service';
import { PetsDialogInfoComponent } from './pets-dialog-info/pets-dialog-info.component';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  petsList = [];

  constructor(
    private dialog: MatDialog,
    private petsService: PetsService,
    ) { }

  ngOnInit() {
    this.getPetInfo();
  }

  getPetInfo(): void {
    this.petsService.get().subscribe(
      value => {
        this.petsList = value;
      }
    )
  }

  onAddPet(): void {
    const dialogRef = this.dialog.open(PetsDialogInfoComponent, {
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPetInfo();
      }
    });
  }

}
