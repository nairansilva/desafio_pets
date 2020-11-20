import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Owner from 'src/app/models/Owner';
import Pet from 'src/app/models/Pet';
import { OwnerService } from 'src/app/services/owner.service';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-info-pet',
  templateUrl: './info-pet.component.html',
  styleUrls: ['./info-pet.component.scss']
})
export class InfoPetComponent implements OnInit {
  pet: Pet;
  owner: Owner;

  constructor(
    private activatedRoute: ActivatedRoute,
    private petService: PetService,
    private ownerService: OwnerService,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.petService.getById(id).subscribe(pet => {
      this.pet = pet;

      this.ownerService.getById(this.pet.ownerId).subscribe(owner => {
        this.owner = owner;
      });
    });
  }

}
