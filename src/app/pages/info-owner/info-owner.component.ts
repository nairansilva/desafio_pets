import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Owner from 'src/app/models/Owner';
import Pet from 'src/app/models/Pet';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-info-owner',
  templateUrl: './info-owner.component.html',
  styleUrls: ['./info-owner.component.scss']
})
export class InfoOwnerComponent implements OnInit {
  owner: Owner;
  pets: Pet[] = [];
  displayedColumns = ['name', 'nickName', 'breed', 'species'];

  constructor(
    private ownerService: OwnerService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.ownerService.getById(id).subscribe(owner => {
      this.owner = owner;
    });
    this.ownerService.getPets(id).subscribe(pets => {
      this.pets = pets;
    });
  }
}
