import Owners from 'src/app/models/Owners';
import { OwnersService } from './../../../../services/owners/owners.service';
import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../../../services/pets/pets.service';
import { Router } from '@angular/router';
import Pet from '../../../models/Pets';

@Component({
  selector: 'app-information-pets',
  templateUrl: './information-pets.component.html',
  styleUrls: ['./information-pets.component.scss'],
})
export class InformationPetsComponent implements OnInit {
  pets: Pet[] = [];
  onlyInfo: any;
  owners: Owners = new Owners();
  petsInformation: any;
  user: any;
  resultOwners: any;

  alertParams!: object;
  constructor(
    private petsservice: PetsService,
    private ownersService: OwnersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPets();
  }
  getPets() {
    this.petsservice.getAllPets().subscribe((pets: Pet[]) => {
      this.petsInformation = pets;
    });
  }

  getOnePet(user: string) {
    this.petsservice.getInfoPet(user).subscribe((pets: Pet[]) => {
      this.onlyInfo = pets;
      this.router.navigate(['/detail-pet'], {
        state: { data: this.onlyInfo, update: true },
      });
    });
  }

  redictToCreate() {
    this.router.navigate(['/create-pet']);
  }
  updatePet(user: string) {
    this.petsservice.getInfoPet(user).subscribe((pets: Pet[]) => {
      this.onlyInfo = pets;
      this.router.navigate(['/update-pet'], {
        state: { data: this.onlyInfo, update: true },
      });
    });
  }
  deleteOnePet(id: string) {
    this.petsservice.deletePet(id).subscribe((pets: Pet[]) => {
      this.onlyInfo = pets;
      window.location.reload();
    });
  }
}
