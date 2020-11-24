import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { OwnerService } from '../services/owner.service';
import { OwnerDialogInfoComponent } from './owner-dialog-info/owner-dialog-info.component';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {

  ownerList = [];

  constructor(
    private dialog: MatDialog,
    private ownerService: OwnerService,
  ) { }

  ngOnInit() {
    this.getOwnerInfo();
  }

  getOwnerInfo(): void {
    this.ownerService.get().subscribe(
      value => {
        this.ownerList = value;
      }
    )
  }

  onAddOwner(): void {
    const dialogRef = this.dialog.open(OwnerDialogInfoComponent, {
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getOwnerInfo();
      }
    });
  }

}
