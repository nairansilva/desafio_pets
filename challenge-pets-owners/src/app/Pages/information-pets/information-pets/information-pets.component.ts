import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../../../services/pets/pets.service';

@Component({
  selector: 'app-information-pets',
  templateUrl: './information-pets.component.html',
  styleUrls: ['./information-pets.component.scss']
})
export class InformationPetsComponent implements OnInit {

  constructor(    private petsservice: PetsService    ) { }

  ngOnInit(): void {
    this.getPets();
  }


  getPets() {
    this.petsservice.getAllPets().subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

}
