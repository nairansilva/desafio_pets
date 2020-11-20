import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Owner from 'src/app/models/Owner';
import Pet from 'src/app/models/Pet';
import { OwnerService } from 'src/app/services/owner.service';
import { PetService } from 'src/app/services/pet.service';
import { ToastService } from 'src/app/services/toast.service';
import species from 'src/app/utils/species';

@Component({
  selector: 'app-update-pet',
  templateUrl: './update-pet.component.html',
  styleUrls: ['./update-pet.component.scss']
})
export class UpdatePetComponent implements OnInit {
  pet: Pet = new Pet();
  owners: Owner[] = [];
  species = species;
  
  constructor(
    private router: Router, 
    private toastService: ToastService,
    private petService: PetService, 
    private ownerService: OwnerService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.petService.getById(id).subscribe(pet => {
      this.pet = pet;
    });

    this.ownerService.getAll().subscribe(owners => {
      this.owners = owners;
    });
  }
  
  updatePet(): void {
    this.petService.update(this.pet).subscribe(() => {
      this.toastService.showMessage('Pet alterado com sucesso!');
      this.router.navigate(['/pet']);
    });
  }
}
