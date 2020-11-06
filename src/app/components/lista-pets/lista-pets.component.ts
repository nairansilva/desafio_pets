import { Component, OnInit } from '@angular/core';
import { PoMenuItem, PoTableColumn } from '@po-ui/ng-components';

@Component({
  selector: 'app-lista-pets',
  templateUrl: './lista-pets.component.html',
  styleUrls: ['./lista-pets.component.css']
})
export class ListaPetsComponent implements OnInit {

  public readonly menus: Array<PoMenuItem> = [
    {
      label: 'Início',
      icon: 'po-icon-home',
      link: '/home'
    },
    {
      label: 'Meu Perfil',
      icon: 'po-icon-user',
      link: '/'
    },
    {
      label: 'Cadastro Pets',
      icon: 'po-icon-grid',
      link: '/lista-pets'
    }
  ]

  columns: Array<PoTableColumn> = [
    {
      property: 'nome',
      label: 'Nome',
      type: 'string'
    },
    {
      property: 'apelido',
      label: 'Apelido',
      type: 'string'
    },
    {
      property: 'raca',
      label: 'Raça',
      type: 'string'
    },
    {
      property: 'especie',
      label: 'Espécie',
      type: 'string'
    },
    {
      property: 'nome_dono',
      label: 'Nome do Dono',
      type: 'string'
    },
    {
      property: 'telefone_dono',
      label: 'Telefone do Dono',
      type: 'string'
    }
  ]

  items: Array<any> = [
    {
      nome: 'Teste',
      apelido: 'Teste',
      raca: 'Teste',
      especie: 'Teste',
      nome_dono: 'Teste',
      telefone_dono: '(11) 99999-9999',
    },
    {
      nome: 'Teste',
      apelido: 'Teste',
      raca: 'Teste',
      especie: 'Teste',
      nome_dono: 'Teste',
      telefone_dono: '(11) 99999-9999',
    }
  ]

  constructor() { }


  ngOnInit(): void {
  }

}
