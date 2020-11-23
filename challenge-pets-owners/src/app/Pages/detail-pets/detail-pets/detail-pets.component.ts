import { Component, OnInit } from '@angular/core';
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


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.petsInfo = history.state.data;
    console.log(this.petsInfo)

  }

}
