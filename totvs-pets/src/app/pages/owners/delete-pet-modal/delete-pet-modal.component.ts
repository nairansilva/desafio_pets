import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { ModalRefService } from 'src/app/components/modal-dynamic/modal-ref.service';
import {  Pet } from 'src/app/models';
import { PetHttpService } from 'src/app/services/pet-http.service';

@Component({
    selector: 'delete-pet-modal',
    templateUrl: './delete-pet-modal.component.html',
    styleUrls: ['./delete-pet-modal.component.scss']
})
export class DeletePetModalComponent implements OnInit {

  petId:string;
  pet$: Observable<Pet>;

  constructor(private petHttp:PetHttpService, private modalRef: ModalRefService) {
    this.petId = this.modalRef.context['petId'];
  }

  ngOnInit() {
    this.pet$ =  this.petHttp.get(this.petId);
  }

  async destroy() {
    const pet = await this.pet$.toPromise()
    try{
    const data = await this.petHttp.delete(this.petId);
    this.modalRef.hide({pet: data,submitted: true})
    }catch(e){
      alert('Ocorreu um erro inesperado. Tente novamente');
    }
  }
}
