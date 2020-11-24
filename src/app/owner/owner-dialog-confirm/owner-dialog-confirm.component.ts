import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-owner-dialog-confirm',
  templateUrl: './owner-dialog-confirm.component.html',
  styleUrls: ['./owner-dialog-confirm.component.scss']
})
export class OwnerDialogConfirmComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<OwnerDialogConfirmComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
