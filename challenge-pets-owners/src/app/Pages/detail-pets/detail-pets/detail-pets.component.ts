import Owners from 'src/app/models/Owners';
import { OwnersService } from 'src/services/owners/owners.service';
import Pets from 'src/app/models/Pets';
import { Component, OnInit } from '@angular/core';
import { PetsService } from 'src/services/pets/pets.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detail-pets',
  templateUrl: './detail-pets.component.html',
  styleUrls: ['./detail-pets.component.scss'],
})
export class DetailPetsComponent implements OnInit {
  stateInfo: any;
  routeState: any;
  arrayPets: any;
  petsInfo: any;
  pets: any;
  owner: any;


  constructor(private router: Router,     private ownersService: OwnersService,
    private petsservice: PetsService) {}

  ngOnInit(): void {
    this.petsInfo = history.state.data;

    this.petsservice.getInfoPet(this.petsInfo.id).subscribe(pets => {
      this.pets = pets;

      this.ownersService.getInfOwners(this.pets.ownerId).subscribe(owner => {
        this.owner = owner;
      });
    });

  }

}
