import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PetsService } from './../../services/pets.service';
import { PetsDialogConfirmComponent } from '../pets-dialog-confirm/pets-dialog-confirm.component';
import { Pet } from './../../model/pet.model';
import { Owner } from './../../model/owner.model';
import { OwnerService } from './../../services/owner.service';

@Component({
  selector: 'app-pets-dialog-info',
  templateUrl: './pets-dialog-info.component.html',
  styleUrls: ['./pets-dialog-info.component.scss']
})
export class PetsDialogInfoComponent implements OnInit {

  formGroup: FormGroup;
  isNewPet = true;
  ownerList: Owner[];

  constructor(
    private fb: FormBuilder,
    private ownerService: OwnerService,
    private petsService: PetsService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<PetsDialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pet
    ) { }

  ngOnInit() {
    if (this.data) {
      this.isNewPet = false;
    };
    this.createFormGroup();
    this.getOwnerList();
  }

  createFormGroup(): void {
    this.formGroup = this.fb.group({
      id: [this.data?.id || null],
      ownerId: [this.data?.ownerId || null, [Validators.required]],
      name: [this.data?.name || null, [Validators.required]],
      breed: [this.data?.breed || null, [Validators.required]],
      species: [this.data?.species || null, [Validators.required]]
    });
  }

  getOwnerList(): void {
    this.ownerService.get().subscribe(
      value => {
        this.ownerList = value;
        console.log('VALUE', value)
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close(null);
    console.log('FORMGORUO', this.formGroup.value)
  }

  onSubmitClick(): void {
    const dialogRefConfirm = this.dialog.open(PetsDialogConfirmComponent, { });
    dialogRefConfirm.afterClosed().subscribe(result => {
      if (result) {
        this.callRequest();
      }
    });
  }

  callRequest(): void {
    if (this.isNewPet) {
      this.postRequest();
    } else {
      this.putRequest();
    }
  }

  postRequest(): void {
    this.petsService.post(this.formGroup.value.id, this.formGroup.value).subscribe(
      value => {
        console.log('POST SUCCESS', value);
        this.dialogRef.close(true);
      }
    );
  }

  putRequest(): void {
    this.petsService.put(this.formGroup.value.id, this.formGroup.value).subscribe(
      value => {
        console.log('PUT SUCCESS', value);
        this.dialogRef.close(true);
      }
    );
  }

}
