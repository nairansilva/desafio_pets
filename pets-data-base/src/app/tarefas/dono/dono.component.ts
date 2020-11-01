import { Component, OnInit } from '@angular/core';
import { DonoService } from '../shared/dono.service';
import { Dono } from '../shared/dono.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dono',
  templateUrl: './dono.component.html',
  styleUrls: ['./dono.component.css']
})

export class DonoComponent implements OnInit {
  dono = {} as Dono;
  donos: Dono[];

  constructor(private donoService: DonoService) {}
  
  ngOnInit() {
    this.getDonos();
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

  // deleta um dono
  deleteDono(dono: Dono) {
    this.donoService.deleteDono(dono).subscribe(() => {
      this.getDonos();
    });
  }

  // copia o dono para ser editado.
  editDono(dono: Dono) {
    this.dono = { ...dono };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getDonos();
    form.resetForm();
    this.dono = {} as Dono;
  }
}