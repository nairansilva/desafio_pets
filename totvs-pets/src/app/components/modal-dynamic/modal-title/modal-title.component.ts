import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'modal-title',
  template: `
  <div class="modal-header">
    <ng-content ></ng-content>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
  </div>
  `,
  styleUrls: ['./modal-title.component.scss']
})
export class ModalTitleComponent implements OnInit {

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    const nativeElement: HTMLElement = this.element.nativeElement;
    const firstChild = nativeElement.firstChild.firstChild;
    (<any>firstChild).classList.add('modal-title');
  }

}
