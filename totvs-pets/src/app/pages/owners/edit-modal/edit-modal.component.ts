import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { ModalRefService } from 'src/app/components/modal-dynamic/modal-ref.service';
import { Owner } from 'src/app/models';
import { OwnerHttpService } from 'src/app/services/owner-http.service';
import { SpeciesHttpService } from 'src/app/services/species-http.service';

@Component({
    selector: 'edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

    ownerId:string;
    owner: Owner = {
      name: '',
      email: '',
      phone: ''
    };

    validationErrors: Owner = {
      name : "",
      email : "",
      phone :  ""
    }


    error = false

    constructor(private ownerHttp: OwnerHttpService, private modalRef: ModalRefService
      ) {
      this.ownerId = this.modalRef.context['ownerId'];
    }

    async ngOnInit() {
      this.owner = await this.ownerHttp.get(this.ownerId).toPromise()
    }

    async editOwner() {
      let validated = true;
      if(!this.owner.name){
        validated = false
        this.validationErrors.name = "Informe o nome"
      }else{
        this.validationErrors.name = ""
      }

      if(!this.owner.email){
        validated = false
        this.validationErrors.email = "Informe o email"
      }else{
          this.validationErrors.email = ""
      }

      if(!this.owner.phone){
        validated = false
        this.validationErrors.phone = "Informe o telefone"
      }else{
        this.validationErrors.phone = ""
      }

      if(validated){
        try{
          const data = await this.ownerHttp.update(this.owner);
          this.modalRef.hide({owner: data,submitted: true})
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

      /*this.ownerHttp.update(this.employee)
      .subscribe(data => {
        this.modalRef.hide({employee: data,submitted: true})
        const message = `O empregado <strong>${data.name}</strong> foi atualizado com sucesso.`;
        this.notification.alertSuccess({
          title : 'Sucesso',
          text : message,
        });
      })*/
    }
}
