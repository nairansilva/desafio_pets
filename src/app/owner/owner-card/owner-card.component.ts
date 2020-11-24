import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Owner } from './../../model/owner.model';
import { OwnerDialogInfoComponent } from './../owner-dialog-info/owner-dialog-info.component';
import { OwnerDialogConfirmComponent } from './../owner-dialog-confirm/owner-dialog-confirm.component';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owner-card',
  templateUrl: './owner-card.component.html',
  styleUrls: ['./owner-card.component.scss']
})
export class OwnerCardComponent implements OnInit {

  @Input() ownerInfo: Owner;
  @Output() ownerEmitter = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private ownerService: OwnerService
  ) { }

  ngOnInit() {
  }

  edit(): void {
    const dialogRef = this.dialog.open(OwnerDialogInfoComponent, {
      data: this.ownerInfo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ownerEmitter.emit(true);
      }
    });
  }

  delete(): void {
    const dialogRef = this.dialog.open(OwnerDialogConfirmComponent, { });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOwner(dialogRef);
      }
    });
  }

  deleteOwner(dialogRef): void {
    this.ownerService.delete(this.ownerInfo.id).subscribe(
      value => {
        this.ownerEmitter.emit(true);
        console.log('DELETE SUCCESS', value);
      }
    );
  }

}
