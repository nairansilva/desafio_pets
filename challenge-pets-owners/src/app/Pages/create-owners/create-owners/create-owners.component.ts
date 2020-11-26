import Owners from 'src/app/models/Owners';
import { OwnersService } from './../../../../services/owners/owners.service';
import Pets from 'src/app/models/Pets';
import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../../../services/pets/pets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-owners',
  templateUrl: './create-owners.component.html',
  styleUrls: ['./create-owners.component.scss'],
})
export class CreateOwnersComponent implements OnInit {
  owners: Owners = new Owners();

  constructor(
    private ownersService: OwnersService,
    private petsservice: PetsService
  ) {}

  ngOnInit(): void {}

  createOneOwner() {
    this.ownersService.createOwner(this.owners).subscribe(() => {
    });
  }

  listAllOwners() {
    this.ownersService.getAllOwners().subscribe((owners) => {
      owners = owners;
    });
  }
}
