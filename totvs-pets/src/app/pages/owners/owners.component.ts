import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/components/modal-dynamic/modal-service';
import { Owner, Pet } from 'src/app/models';
import { OwnerHttpService } from 'src/app/services/owner-http.service';
import { CreatePetModal } from './create-pet-modal/create-pet-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { DeletePetModalComponent } from './delete-pet-modal/delete-pet-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { EditPetModalComponent } from './edit-pet-modal/edit-pet-modal.component';
import { NewModalComponent } from './new-modal/new-modal.component';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {

  constructor(private ownerHttp: OwnerHttpService, private modalService: ModalService) { }

  search = ''
  selectedOwner: Owner | null;

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
      name: 'email',
      label: 'Email',
      order: true
    },
    {
      name: 'phone',
      label: 'Telefone',
      order: false
    },
    {label: 'Pets'},
    {label: 'Ações'},
  ]

  owners: Owner[] = [];

  ngOnInit(): void {
    this.getData()
    console.log(this.columns)
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
      const data = await this.ownerHttp.list({search:this.search, sort : this.sortColumn,pagination: {
        page: this.pagination.currentPage,
        perPage: this.pagination.itemsPerPage
      }});

      this.owners = data.data;
      this.pagination.totalItems = data.total
      this.pagination.itemsPerPage = data.perPage
      this.pagination.currentPage = data.page
    }catch(e){
      alert('Ocorreu um erro inesperado, contate o suporte')
    }
  }

  openNewModal(){
    const modalRef = this.modalService.create(NewModalComponent)

    modalRef.onHide.subscribe(event => {
      this.getData(event)
    })
    modalRef.show()
  }

  openEditModal(owner:Owner){
    const modalRef = this.modalService.create(EditModalComponent,{
      ownerId: owner.id
    })

    modalRef.onHide.subscribe(event => {
      this.getData(event)
    })
    modalRef.show()
  }

  openDestroyModal(owner:Owner){
    const modalRef = this.modalService.create(DeleteModalComponent,{
      ownerId: owner.id
    })
    modalRef.onHide.subscribe(event => {
      this.getData(event)
    })
    modalRef.show()
  }

  openCreatePet(owner:Owner){
    const modalRef = this.modalService.create(CreatePetModal,{
      ownerId: owner.id
    })
    modalRef.onHide.subscribe(event => {
      this.getData(event)
      this.selectedOwner = null
    })
    modalRef.show()
  }

  openEditPetModal(pet:Pet){
    const modalRef = this.modalService.create(EditPetModalComponent,{
      petId: pet.id,
    })

    modalRef.onHide.subscribe(event => {
      this.getData(event)
      this.selectedOwner = null
    })
    modalRef.show()
  }

  openDestroyPetModal(pet:Pet){
    const modalRef = this.modalService.create(DeletePetModalComponent,{
      petId: pet.id
    })
    modalRef.onHide.subscribe(event => {
      this.getData(event)
      this.selectedOwner = null
    })
    modalRef.show()
  }


  viewPet(owner:Owner){
    console.log(owner);
      this.selectedOwner = owner
  }

}
