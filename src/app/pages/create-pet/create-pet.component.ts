import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Owner from 'src/app/models/Owner';
import Pet from 'src/app/models/Pet';
import { OwnerService } from 'src/app/services/owner.service';
import { PetService } from 'src/app/services/pet.service';
import { ToastService } from 'src/app/services/toast.service';
import species from 'src/app/utils/species';

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.scss']
})
export class CreatePetComponent implements OnInit {
  pet: Pet = new Pet();
  owners: Owner[] = [];
  species = species;

  constructor(
    private router: Router, 
    private petService: PetService, 
    private toastService: ToastService,
    private ownerService: OwnerService
  ) { }

  ngOnInit(): void {
    this.ownerService.getAll().subscribe(owners => {
      this.owners = owners;
    });
  }

  createPet(): void {
    this.petService.create(this.pet).subscribe(() => {
      this.toastService.showMessage('Pet cadastrado');
      this.router.navigate(['/pet']);
    });
  }

}
