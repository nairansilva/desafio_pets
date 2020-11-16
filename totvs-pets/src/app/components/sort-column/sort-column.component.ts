import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[sortColumn]',
  template: `
    <a href="javascript:void(0)">
      <ng-content></ng-content>&nbsp;
      <img src="assets/up.svg" style='width: 10px' *ngIf="showArrowUp()">
      <img src="assets/down.svg" style='width: 10px' *ngIf="showArrowDown()">

    </a>
  `,
  styles: [
  ]
})
export class SortColumnComponent implements OnInit {

  @Input()
  sortColumn: {column,sort};

  @Input()
  columnName:string;

  @Output()
  onSort = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('click')
  changeSort(){
    this.sortColumn.column = this.columnName
    this.sortColumn.sort = this.sortColumn.sort === 'desc' ? 'asc' : 'desc';
    this.onSort.emit(this.sortColumn);
  }

  showArrowDown(){
    return this.columnName=== this.sortColumn.column && this.sortColumn.sort === 'desc';
  }

  showArrowUp(){
    return this.columnName=== this.sortColumn.column && this.sortColumn.sort === 'asc';
  }

}
