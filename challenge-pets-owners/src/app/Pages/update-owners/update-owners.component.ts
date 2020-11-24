import Owners from 'src/app/models/Owners';
import { OwnersService } from 'src/services/owners/owners.service';
import Pets from 'src/app/models/Pets';
import { Component, OnInit } from '@angular/core';
import { PetsService } from 'src/services/pets/pets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-owners',
  templateUrl: './update-owners.component.html',
  styleUrls: ['./update-owners.component.scss']
})
export class UpdateOwnersComponent implements OnInit {

  constructor( private ownersService: OwnersService,
    private petsservice: PetsService) {   }

    stateInfo: any;
    routeState: any;
    arrayPets: any;
    ownersInfo: any;
    owners: Owners = new Owners();

  ngOnInit() {

    this.ownersInfo = history.state.data;
    console.log('petsinfo', this.ownersInfo);
  }
  updateOneOwner(id: string) {
    this.ownersService.updateInfOwner(id, this.owners).subscribe(() => {
      console.log('update', this.owners);
      window.location.reload();

    });
  }



}
