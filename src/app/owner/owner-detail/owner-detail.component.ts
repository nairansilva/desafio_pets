import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OwnerService } from 'src/app/services/owner.service';

import { Owner } from './../../model/owner.model';
import { Pet } from './../../model/pet.model';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.scss']
})
export class OwnerDetailComponent implements OnInit {

  petsInfoList: Pet[];

  constructor(
    private dialogRef: MatDialogRef<OwnerDetailComponent>,
    private ownerService: OwnerService,
    @Inject(MAT_DIALOG_DATA) public data: Owner
    ) { }

  ngOnInit() {
    this.getOwnerPets();
  }

  getOwnerPets(): void {
    this.ownerService.getOwnerPets(this.data.id).subscribe(
      value => {
        this.petsInfoList = value;
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
