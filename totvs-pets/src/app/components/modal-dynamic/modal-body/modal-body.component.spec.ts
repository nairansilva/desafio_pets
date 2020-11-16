import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'modal-title',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: []
})
export class ModalBodyComponent implements OnInit {

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    const nativeElement: HTMLElement = this.element.nativeElement;
    const firstChild = nativeElement.firstChild;
    (<any>firstChild).classList.add('modal-body');
  }

}
