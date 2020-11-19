import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Pet } from 'src/app/model/pet.model';
import { PetsService } from 'src/app/services/pets.service';

import * as uuid from 'uuid';

@Component({
  selector: 'app-pets-dialog-info',
  templateUrl: './pets-dialog-info.component.html',
  styleUrls: ['./pets-dialog-info.component.scss']
})
export class PetsDialogInfoComponent implements OnInit {

  formGroup: FormGroup;
  isNewPet = true;

  constructor(
    private fb: FormBuilder,
    private petsService: PetsService,
    private dialogRef: MatDialogRef<PetsDialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pet
    ) { }

  ngOnInit() {
    if (this.data) {
      this.isNewPet = false;
    };
    this.createFormGroup();
  }

  createFormGroup() {
    this.formGroup = this.fb.group({
      id: [this.data?.id || uuid.v4()],
      name: [this.data?.name || null, [Validators.required]],
      breed: [this.data?.breed || null, [Validators.required]],
      species: [this.data?.species || null, [Validators.required]],
      telefoneDono: [null, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmitClick(): void {
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
