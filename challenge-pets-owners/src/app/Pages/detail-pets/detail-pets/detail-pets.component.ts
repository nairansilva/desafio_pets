import  Owners  from 'src/app/models/Owners';
import { OwnersService } from './../../../../services/owners/owners.service';
import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../../../services/pets/pets.service';
import { Router } from '@angular/router';
import Pet from "../../../models/Pets";



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
  onlyInfo: any;
  owners: Owners = new Owners;
  petsInformation: any;
  user: any;
  resultOwners: any;


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

  updatePet(user: string){

    this.petsservice.getInfoPet(user).subscribe((pets: Pet[]) => {
      this.onlyInfo = pets;
      this.router.navigate(['/update-pet'], { state: { data: this.onlyInfo, update: true } });
    });
  }
  deleteOnePet(id: string){

    this.petsservice.deletePet(id).subscribe((pets: Pet[]) => {
      this.onlyInfo = pets;
      window.location.reload();

    });
  }

}
