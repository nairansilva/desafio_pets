import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { ModalRefService } from 'src/app/components/modal-dynamic/modal-ref.service';
import { Owner, Pet } from 'src/app/models';
import { OwnerHttpService } from 'src/app/services/owner-http.service';
import { PetHttpService } from 'src/app/services/pet-http.service';
import { SpeciesHttpService } from 'src/app/services/species-http.service';

@Component({
    selector: 'edit-pet-modal',
    templateUrl: './edit-pet-modal.component.html',
    styleUrls: ['./edit-pet-modal.component.scss']
})
export class EditPetModalComponent implements OnInit {

    petId:string;

    owner: Owner = {
      name: '',
      email: '',
      phone: ''
    };

    species: [];
    breeds: [];

    pet : Pet = {
      name : "",
      nickname : "",
      specie_id :  null,
      breed_id :  null,
      owner_id: ''
    }

    validationErrors: Pet = {
      name : "",
      nickname : "",
      specie_id : "",
      breed_id :  "",
      owner_id: ''
    }

    error = false

    constructor(private ownerHttp: OwnerHttpService, private modalRef: ModalRefService,private petHttp : PetHttpService, private speciesHttp: SpeciesHttpService
      ) {
      this.petId = this.modalRef.context['petId'];
    }

    onSelectionChange($event){
      const filter : any = this.species.filter((specie : any)  => specie.id == this.pet.specie_id)
      this.breeds = filter[0].breeds;
    }

    async ngOnInit() {
      this.species = await this.speciesHttp.list()
      this.pet = await this.petHttp.get(this.petId).toPromise()
      const filter : any = this.species.filter((specie : any)  => specie.id == this.pet.specie_id)
      this.breeds = filter[0].breeds;
    }

    async editPet() {
      let validated = true;
      if(!this.pet.name){
        validated = false
        this.validationErrors.name = "Informe o nome"
      }else{
        this.validationErrors.name = ""
      }

      if(!this.pet.nickname){
        validated = false
        this.validationErrors.nickname = "Informe o apelido"
      }else{
          this.validationErrors.nickname = ""
      }

      if(!this.pet.specie_id){
        validated = false
        this.validationErrors.specie_id = "Informe a espécie"
      }else{
          this.validationErrors.specie_id = ""
      }

      if(!this.pet.breed_id){
        validated = false
        this.validationErrors.breed_id = "Informe a raça"
      }else{
          this.validationErrors.breed_id = ""
      }

      if(validated){
        try{
          const data = await this.petHttp.update(this.pet);
          this.modalRef.hide({pet: data,submitted: true})
        }catch(e){
          if(e.error instanceof ErrorEvent){
            alert('Ocorreu um erro inesperado, tente novamente')
          }else if (e instanceof HttpErrorResponse) {
            if(e.error.message){
              Object.keys(e.error.message).forEach(error => {
                this.validationErrors[error] = e.error.message[error];
              });
            }else{
              alert('Ocorreu um erro inesperado, contate o suporte')
            }
          }
        }
      }
    }
}
