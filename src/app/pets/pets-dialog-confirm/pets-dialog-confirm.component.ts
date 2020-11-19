import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pets-dialog-confirm',
  templateUrl: './pets-dialog-confirm.component.html',
  styleUrls: ['./pets-dialog-confirm.component.scss']
})
export class PetsDialogConfirmComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PetsDialogConfirmComponent>,) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
