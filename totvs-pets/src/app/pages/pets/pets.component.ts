import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models';
import { PetHttpService } from 'src/app/services/pet-http.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  search = ''
  sortColumn = {column: 'name',sort: 'asc'}
  pagination = {
    itemsPerPage : 1,
    currentPage:1,
    totalItems: 0
  }

  columns = [
    {
      name: 'name',
      label: 'Nome',
      order: true
    },
    {
      name: 'nickname',
      label: 'Apelido',
      order: true
    },
    {
      name: 'owner.name',
      label: 'Dono'
    }
  ]

  pets: Pet[] = [];

  constructor(private petHttp: PetHttpService) { }

  ngOnInit(): void {
    this.getData()
  }

  handleSearch(search){
    this.search = search
    this.pagination.currentPage = 1;
    this.getData()
  }

  handleSort($event){
    this.getData()
  }

  handlePagination(page){
    this.pagination.currentPage = page;
    this.getData()
  }

  async getData($event = null) {
    try{
      const data = await this.petHttp.list({search:this.search, sort : this.sortColumn,pagination: {
        page: this.pagination.currentPage,
        perPage: this.pagination.itemsPerPage
      }});
      console.log(data)
      this.pets = data.data;
      this.pagination.totalItems = data.total
      this.pagination.itemsPerPage = data.perPage
      this.pagination.currentPage = data.page
    }catch(e){
      alert('Ocorreu um erro inesperado, contate o suporte')
    }
  }

}
