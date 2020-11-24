import { OwnersService } from './../../../../services/owners/owners.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Owners from "../../../models/Owners";

@Component({
  selector: 'app-information-owners',
  templateUrl: './information-owners.component.html',
  styleUrls: ['./information-owners.component.scss']
})
export class InformationOwnersComponent implements OnInit {

  constructor(private ownersService: OwnersService, private router: Router) { }

  ownersInformation: any;

  ngOnInit() {
    this.getOwners();
  }

  getOwners() {
    this.ownersService.getAllOwners().subscribe((owners: Owners[]) => {
      this.ownersInformation = owners;
      console.log(this.ownersInformation);

    });


  }

  redictToCreate(){
    this.router.navigate(["/create-owners"]);

  }

}
