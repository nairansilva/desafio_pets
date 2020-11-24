import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Owner } from './../../model/owner.model';
import { OwnerService } from './../../services/owner.service';

import * as uuid from 'uuid';

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
    private dialogRef: MatDialogRef<OwnerDialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Owner
  ) { }

  ngOnInit() {
    if (this.data) {
      this.isNewOwner = false;
    };
    this.createFormGroup();
  }

  createFormGroup() {
    this.formGroup = this.fb.group({
      id: [this.data?.id || uuid.v4()],
      name: [this.data?.name || null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmitClick(): void {
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
