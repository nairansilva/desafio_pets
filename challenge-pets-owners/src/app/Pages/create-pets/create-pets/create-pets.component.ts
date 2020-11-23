import { OwnersService } from './../../../../services/owners/owners.service';
import Pets from 'src/app/models/Pets';
import Owners from 'src/app/models/Owners';
import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../../../services/pets/pets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-pets',
  templateUrl: './create-pets.component.html',
  styleUrls: ['./create-pets.component.scss']
})
export class CreatePetsComponent implements OnInit {
  owners: Owners[] = [];
  pets: Pets = new Pets();
  constructor(private ownersService: OwnersService, private petsservice: PetsService, private router: Router) { }

  ngOnInit(): void {
    this.listAllOwners();
  }

  createOnePet() {
    this.petsservice.createPet(this.pets).subscribe(() => {
      console.log(this.pets)
    });
  }

  listAllOwners() {
    this.ownersService.getAllOwners().subscribe((owners: Owners[]) => {
      this.owners = owners;
    
    });
  }

}
