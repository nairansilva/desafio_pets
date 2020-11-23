import Pets from 'src/app/models/Pets';
import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../../../services/pets/pets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-pets',
  templateUrl: './create-pets.component.html',
  styleUrls: ['./create-pets.component.scss']
})
export class CreatePetsComponent implements OnInit {

  pets: Pets = new Pets();

  constructor( private petsservice: PetsService , private router: Router) { }

  ngOnInit(): void {
  }

  createOnePet(){
    this.petsservice.createPet(this.pets).subscribe(() => {
      console.log(this.pets)
    });
  }

}
