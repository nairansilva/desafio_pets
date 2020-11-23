import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../../../services/pets/pets.service';
import { Router } from '@angular/router';
import Pet from "../../../models/Pets";


@Component({
  selector: 'app-information-pets',
  templateUrl: './information-pets.component.html',
  styleUrls: ['./information-pets.component.scss']
})
export class InformationPetsComponent implements OnInit {

  pets: Pet[] = [];
  onlyInfo: any;
  petsInformation: any;
  user: any;


  constructor(    private petsservice: PetsService , private router: Router ) {

   }

  ngOnInit(): void {
    this.getPets();

  }
  getPets() {
    this.petsservice.getAllPets().subscribe((pets: Pet[]) => {
    this.petsInformation = pets;
    console.log(this.petsInformation);

    });


}

  getOnePet(user: string) {

    this.petsservice.getInfoPet(user).subscribe((pets: Pet[]) => {
    this.onlyInfo = pets;
    this.router.navigate(['/detail-pet'], {state: {data: this.onlyInfo, update: true}});
    console.log(this.onlyInfo)
    });
}

redictToCreate(){

  this.router.navigate(["/create-pet"]);
}
}
