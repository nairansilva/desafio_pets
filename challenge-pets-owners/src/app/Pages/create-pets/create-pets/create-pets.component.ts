import Owners from 'src/app/models/Owners';
import { OwnersService } from './../../../../services/owners/owners.service';
import Pets from 'src/app/models/Pets';
import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../../../services/pets/pets.service';

@Component({
  selector: 'app-create-pets',
  templateUrl: './create-pets.component.html',
  styleUrls: ['./create-pets.component.scss'],
})
export class CreatePetsComponent implements OnInit {
  owners: Owners[] = [];
  pets: Pets = new Pets();
  constructor(
    private ownersService: OwnersService,
    private petsservice: PetsService,
  ) {}

  ngOnInit(): void {
    this.listAllOwners();
  }

  createOnePet() {
    this.petsservice.createPet(this.pets).subscribe(() => {
      console.log(this.pets);
      window.location.reload();

    });
  }

  listAllOwners() {
    this.ownersService.getAllOwners().subscribe(owners => {
      console.log(owners)
      this.owners = owners;
    });
  }
}

