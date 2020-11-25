import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Owner } from './../../model/owner.model';
import { OwnerService } from './../../services/owner.service';
import { OwnerDialogConfirmComponent } from '../owner-dialog-confirm/owner-dialog-confirm.component';

@Component({
  selector: 'app-owner-dialog-info',
  templateUrl: './owner-dialog-info.component.html',
  styleUrls: ['./owner-dialog-info.component.scss']
})
export class OwnerDialogInfoComponent implements OnInit {

  formGroup: FormGroup;
  isNewOwner = true;

  constructor(
    private fb: FormBuilder,
    private ownerService: OwnerService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<OwnerDialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Owner
  ) { }

  ngOnInit() {
    if (this.data) {
      this.isNewOwner = false;
    };
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.formGroup = this.fb.group({
      id: [this.data?.id],
      name: [this.data?.name || null, [Validators.required]],
      email: [this.data?.email || null, [Validators.required, Validators.email]],
      phone: [this.data?.phone || null, [Validators.required]],
    });
  }

  onNoClick(): void {
    console.log("DLASJFK", this.formGroup)
    this.dialogRef.close(null);
  }

  onSubmitClick(): void {
    const dialogRef = this.dialog.open(OwnerDialogConfirmComponent, { });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.callRequest();
      }
    });
  }

  callRequest(): void {
    if (this.isNewOwner) {
      this.postRequest();
    } else {
      this.putRequest();
    }
  }

  postRequest(): void {
    this.ownerService.post(this.formGroup.value.id, this.formGroup.value).subscribe(
      value => {
        console.log('POST SUCCESS', value);
        this.dialogRef.close(true);
      }
    );
  }

  putRequest(): void {
    this.ownerService.put(this.formGroup.value.id, this.formGroup.value).subscribe(
      value => {
        console.log('PUT SUCCESS', value);
        this.dialogRef.close(true);
      }
    );
  }

}
