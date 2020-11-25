import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Menu } from './model/menu.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  menuList: Menu[] = [
    {
      name: 'Home',
      path: ''
    },
    {
      name: 'Pets',
      path: '/pets'
    },
    {
      name: 'Donos',
      path: 'owner'
    }
  ];

  constructor(private router: Router) {}

  onClick(menuPath: string): void {
    this.router.navigate([menuPath]);
  }
}
