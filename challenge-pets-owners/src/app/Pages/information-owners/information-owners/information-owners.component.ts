import { OwnersService } from './../../../../services/owners/owners.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Owners from '../../../models/Owners';

@Component({
  selector: 'app-information-owners',
  templateUrl: './information-owners.component.html',
  styleUrls: ['./information-owners.component.scss'],
})
export class InformationOwnersComponent implements OnInit {
  constructor(private ownersService: OwnersService, private router: Router) {}

  ownersInformation: any;
  onlyInfo: any;
  owners: Owners[] = [];


  ngOnInit() {
    this.getOwners();
  }

  getOwners() {
    this.ownersService.getAllOwners().subscribe((owners: Owners[]) => {
      this.ownersInformation = owners;
      console.log(this.ownersInformation);
    });
  }

  redictToCreate() {
    this.router.navigate(['/create-owners']);
  }

  updateOwner(user: string) {
    this.ownersService.getInfOwners(user).subscribe((owners: Owners[]) => {
      this.onlyInfo = owners;
      this.router.navigate(['/update-owners'], {
        state: { data: this.onlyInfo, update: true },
      });
      console.log(this.onlyInfo);

    });
  }
  deleteOneOwner(id: string) {
    this.ownersService.deleteOwner(id).subscribe((owners: Owners[]) => {
      this.onlyInfo = owners;
      window.location.reload();
    });
  }
  getOneOwner(user: string) {

    this.ownersService.getInfOwners(user).subscribe((owners: Owners[]) => {
      this.onlyInfo = owners;
      this.router.navigate(['/detail-owners'], { state: { data: this.onlyInfo, update: true } });
      console.log(this.onlyInfo);
    });
  }
}

