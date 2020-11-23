import Owners from 'src/app/models/Owners';
import { OwnersService } from 'src/services/owners/owners.service';
import Pets from 'src/app/models/Pets';
import { Component, OnInit } from '@angular/core';
import { PetsService } from 'src/services/pets/pets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-pets',
  templateUrl: './update-pets.component.html',
  styleUrls: ['./update-pets.component.scss'],
})
export class UpdatePetsComponent implements OnInit {
  owners: Owners[] = [];
  stateInfo: any;
  routeState: any;
  arrayPets: any;
  petsInfo: any;
  pets: Pets = new Pets();

  constructor(
    private ownersService: OwnersService,
    private petsservice: PetsService
  ) {}

  ngOnInit(): void {
    this.ownersService.getAllOwners().subscribe(owners => {
      this.owners = owners;
    });
    this.petsInfo = history.state.data;
    console.log('petsinfo', this.petsInfo);
  }

  updatePet(id: string) {
    this.petsservice.updateInfoPet(id, this.pets).subscribe(() => {
      console.log('update', this.pets);
      window.location.reload();

    });
  }
}
