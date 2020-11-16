import { Component, ComponentFactoryResolver, ElementRef, Injector, OnInit, ViewChild,EventEmitter } from '@angular/core';
import { Observable, ReplaySubject ,Subject} from 'rxjs';
import { ModalContentDirective } from '../modal-content.directive';
import { ModalRefService } from '../modal-ref.service';
import { first} from 'rxjs/operators';
declare const $;

@Component({
  selector: 'modal-dynamic',
  template: `
  <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
            <ng-template modalContent></ng-template>
          </div>
      </div>
  </div>
  `,
  styleUrls: []
})
export class ModalDynamicComponent implements OnInit {

  //@ViewChild('modalContent',{read: ModalContentDirective })
 // teste: ModalContentDirective;

 private _onHide: ReplaySubject<any> = new ReplaySubject(1);

 private _onShow: ReplaySubject<any> = new ReplaySubject(1);

  @ViewChild(ModalContentDirective, { static: true })
  modalContent: ModalContentDirective;
  showEventData = null;
  hideEventData = null;
  modalRef: ModalRefService;
  contextModal;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,private element: ElementRef, private injector: Injector) { }


  ngOnInit(): void {

  }

  get onHide(): Subject<any> {
    return this._onHide.pipe(first()) as Subject<any>;
}

get onShow(): Subject<any> {
    return this._onShow.pipe(first()) as Subject<any>;
}

  dispose() {
    $(this.divModal).modal('dispose');
  }

  mount(modalmplementedComponent,context = {}):ModalRefService{
    this.contextModal = context;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalmplementedComponent)
    this.modalContent.viewContainerRef.createComponent(componentFactory,null,this.makeLocalInjector())
    return this.modalRef
  }

  /* Cria um serviço local*/

  private makeLocalInjector() {
    return Injector.create({
        providers: [
            {provide: ModalRefService, useValue: this.makeModalRef()}
        ],
        parent: this.injector
    });
}

private makeModalRef() {
    this.modalRef = new ModalRefService();
    this.modalRef.instance = this;
    this.modalRef.context = this.contextModal;
    return this.modalRef;
}

  hide(eventData = null) {
  this.hideEventData = eventData;
  $(this.divModal).modal('hide');
  }

  show(eventData = null) {
    this.registerEvents();
    this.showEventData = eventData;
    $(this.divModal).modal('show');
  }

  private registerEvents(){
    $(this.divModal).on('hidden.bs.modal', (e) => {
      console.log('escondido', e);
       this.onHide.next({
         event : e,
         data: this.hideEventData
       });
   });

   $(this.divModal).on('shown.bs.modal', (e) => {
      console.log('mostrado', e);
       this.onShow.next({
        event : e,
        data: this.showEventData
      });
   });
  }

  private get divModal(): HTMLElement {
      const nativeElement: HTMLElement = this.element.nativeElement; //modal
      return nativeElement.firstChild as HTMLElement;
  }

}
