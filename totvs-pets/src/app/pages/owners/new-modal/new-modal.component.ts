import { Component, OnInit, OnDestroy } from '@angular/core';
import { Owner } from 'src/app/models';
import { OwnerHttpService } from 'src/app/services/owner-http.service';
import { ModalRefService } from 'src/app/components/modal-dynamic/modal-ref.service';
import { HttpErrorResponse } from '@angular/common/http';

declare const $;
@Component({
  selector: 'new-modal',
  templateUrl: './new-modal.component.html',
  styleUrls: ['./new-modal.component.scss']
})

export class NewModalComponent implements OnInit, OnDestroy {
  owner: Owner = {
    name : "",
    email : "",
    phone :  ""
  }



  validationErrors: Owner = {
    name : "",
    email : "",
    phone :  ""
  }


  constructor(
    private ownerHttp: OwnerHttpService,
    private modalRef: ModalRefService) {}

    unsubscribeOnShow;

  ngOnInit(): void {
    this.unsubscribeOnShow = this.modalRef.onShow.subscribe(() => {
      setTimeout(() => {
        console.log('Open')
      },200)
  });
  }

  ngOnDestroy():void{
    console.log('Employe new model destruido')
    this.unsubscribeOnShow.unsubscribe()
  }

  async addOwner(){
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
        const data = await this.ownerHttp.create(this.owner);
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
  }
}
