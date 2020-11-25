import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { OwnerService } from 'src/app/services/owner.service';

import { Owner } from './../../model/owner.model';
import { Pet } from './../../model/pet.model';

@Component({
  selector: 'app-pets-detail',
  templateUrl: './pets-detail.component.html',
  styleUrls: ['./pets-detail.component.scss']
})
export class PetsDetailComponent implements OnInit {

  ownerInfo: Owner;

  constructor(
    private dialogRef: MatDialogRef<PetsDetailComponent>,
    private ownerService: OwnerService,
    @Inject(MAT_DIALOG_DATA) public data: Pet
  ) { }

  ngOnInit() {
    this.getOwnerInfo();
  }

  getOwnerInfo(): void {
    this.ownerService.getById(this.data.ownerId).subscribe(
      value => {
        this.ownerInfo = value;
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
