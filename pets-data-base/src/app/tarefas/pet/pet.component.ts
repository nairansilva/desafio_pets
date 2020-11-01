import { Component, OnInit } from '@angular/core';
import { PetService } from '../shared/pet.service';
import { Pet } from '../shared/pet.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  pet = {} as Pet;
  pets: Pet[];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.getPets();
  }

  /* Funções do CRUD do PET */

  // defini se um pet será criado ou atualizado
  savePet(form: NgForm) {
    if (this.pet.id !== undefined) {
      this.petService.updatePet(this.pet).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.petService.savePet(this.pet).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtér todos os pets
  getPets() {
    this.petService.getPets().subscribe((pets: Pet[]) => {
      this.pets = pets;
    });
  }

  // deleta um pet
  deletePet(pet: Pet) {
    this.petService.deletePet(pet).subscribe(() => {
      this.getPets();
    });
  }

  // copia o pet para ser editado.
  editPet(pet: Pet) {
    this.pet = { ...pet };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getPets();
    form.resetForm();
    this.pet = {} as Pet;
  }
}
