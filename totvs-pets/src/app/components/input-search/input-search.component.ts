import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'input-search',
  template: `
    <form (submit)="submit()">
      <div class="form-row">
      <div class="col-11">
      <input type="search" class="form-control" name="search" placeholder="Digite sua busca" [(ngModel)]="search">
    </div>
    <div class="col-1">
      <button type="submit" class="btn btn-primary" title="Buscar">
      <img src="assets/loupe.svg" alt="Logo" style="width:15px;">
      </button>
    </div>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class InputSearchComponent implements OnInit {

  constructor() { }

  search = "";
  @Output()
  onSearch: EventEmitter<string> = new EventEmitter()

  ngOnInit(): void {
  }

  submit(){
    this.onSearch.emit(this.search)
    return false;
  }

}
