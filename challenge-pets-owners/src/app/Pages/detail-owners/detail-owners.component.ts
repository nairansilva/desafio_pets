import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-owners',
  templateUrl: './detail-owners.component.html',
  styleUrls: ['./detail-owners.component.scss']
})
export class DetailOwnersComponent implements OnInit {

  constructor() { }
  stateInfo: any;
  routeState: any;
  arrayPets: any;
  ownersInfo: any;


  ngOnInit() {
    this.ownersInfo = history.state.data;
  }

}
