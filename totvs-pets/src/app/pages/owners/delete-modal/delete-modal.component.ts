import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { ModalRefService } from 'src/app/components/modal-dynamic/modal-ref.service';
import { Owner } from 'src/app/models';
import { OwnerHttpService } from 'src/app/services/owner-http.service';

@Component({
    selector: 'delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  ownerId:string;
  owner$: Observable<Owner>;

  constructor(private ownerHttp:OwnerHttpService, private modalRef: ModalRefService) {
    this.ownerId = this.modalRef.context['ownerId'];
  }

  ngOnInit() {
    this.owner$ =  this.ownerHttp.get(this.ownerId);
  }

  async destroy() {
    const owner = await this.owner$.toPromise()
    try{
    const data = await this.ownerHttp.delete(this.ownerId);
    this.modalRef.hide({owner: data,submitted: true})
    }catch(e){
      alert('Ocorreu um erro inesperado. Tente novamente');
    }
  }
}
