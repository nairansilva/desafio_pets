import { Component, OnInit } from '@angular/core';
import { DonoService } from './services/dono.service';
import { Dono } from './models/dono';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  dono = {} as Dono;
  donos: Dono[];

  constructor(private donoService: DonoService) {}
  
  ngOnInit() {
    this.getDonos();
  }

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