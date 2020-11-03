import { Component, OnInit } from '@angular/core';
import { PetService } from '../shared/pet.service';
import { DonoService } from '../shared/dono.service';
import { Dono } from '../shared/dono.model';
import { Pet } from '../shared/pet.model';
import { NgForm } from '@angular/forms';
import { element } from 'protractor';

@Component({
  selector: 'app-dono',
  templateUrl: './dono.component.html',
  styleUrls: ['./dono.component.css']
})

export class DonoComponent implements OnInit {
  dono = {} as Dono;
  donos: Dono[];
  pet = {} as Pet;
  pets: Pet[];

  constructor(private donoService: DonoService, private petService: PetService) {}
  
  ngOnInit() {
    this.getDonos();
    this.getPets();
  }

  /* Funções do CRUD do DONO */

  // defini se um dono será criado ou atualizado
  saveDono(form: NgForm) {
    if (this.dono.id !== undefined) {
      this.donoService.updateDono(this.dono).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.donoService.saveDono(this.dono).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtér todos os donos
  getDonos() {
    this.donoService.getDonos().subscribe((donos: Dono[]) => {
      this.donos = donos;
    });
  }

  // Chama o serviço para obtér todos os pets
  getPets() {
    this.petService.getPets().subscribe((pets: Pet[]) => {
      this.pets = pets;
    });
  }

  // deleta um dono
  deleteDono(dono: Dono) {
    if (confirm('Tem certeza que deseja deletar os dados?')) {
      this.pets.forEach(element => {
        if(element.id_dono == dono.id) {
          this.petService.deletePet(element).subscribe(() => {

          });
        }
      })
      this.donoService.deleteDono(dono).subscribe(() => {
        this.getDonos();
      });
    } else {
      console.log('Nada foi alterado');
    }
  }

  // copia o dono para ser editado.
  editDono(dono: Dono) {
    if (confirm('Tem certeza que quer editar os dados?')) {
      this.dono = { ...dono };
    } else {
      console.log('Nada foi alterado');
    }
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getDonos();
    this.getPets();
    form.resetForm();
    this.dono = {} as Dono;
  }
}