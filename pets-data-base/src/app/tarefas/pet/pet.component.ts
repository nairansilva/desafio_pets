import { Component, OnInit } from '@angular/core';
import { PetService } from '../shared/pet.service';
import { DonoService } from '../shared/dono.service';
import { Pet } from '../shared/pet.model';
import { Dono } from '../shared/dono.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})

export class PetComponent implements OnInit {
  pet = {} as Pet;
  pets: Pet[];
  dono = {} as Dono;
  donos: Dono[];

  especies: any[] = [
    {name:'Cachorro'},
    {name:'Gato'}
  ];

  racasdog: any[] = [
    {name:'Nao definida'},
    {name:'Bulldog'},
    {name:'Pug'},
    {name:'Poodle'},
    {name:'Golden'}
  ];

  racascat: any[] = [
    {name:'Nao definida'},
    {name:'Persa'},
    {name:'Siames'},
    {name:'Himalaia'},
    {name:'Maine'}
  ];

  constructor(private petService: PetService, private donoService: DonoService) {}

  ngOnInit(): void {
    
    this.getPets();
    this.getDonos();
    this.pet.especie = 'Cachorro';
    this.pet.raca = 'Nao definida';
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

  // Chama o serviço para obtér todos os donos
  getDonos() {
    this.donoService.getDonos().subscribe((donos: Dono[]) => {
      this.donos = donos;
      this.pet.id_dono = this.donos[0].id;
    });
  }

  // deleta um pet
  deletePet(pet: Pet) {
    if (confirm('Tem certeza que deseja deletar os dados?')) {
      this.petService.deletePet(pet).subscribe(() => {
        this.getPets();
        this.getDonos();
      });
    } else {
      console.log('Nada foi alterado');
    }
  }

  // copia o pet para ser editado.
  editPet(pet: Pet) {
    if (confirm('Tem certeza que deseja editar os dados?')) {
      this.pet = { ...pet };
    } else {
      console.log('Nada foi alterado');
    }
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getPets();
    this.getDonos();
    form.resetForm();
    this.pet = {} as Pet;
  }
}
