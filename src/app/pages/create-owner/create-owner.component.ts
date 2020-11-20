import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Owner from 'src/app/models/Owner';
import { OwnerService } from 'src/app/services/owner.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-owner',
  templateUrl: './create-owner.component.html',
  styleUrls: ['./create-owner.component.scss']
})
export class CreateOwnerComponent implements OnInit {
  owner: Owner = new Owner();

  constructor(
    private router: Router,
    private ownerService: OwnerService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    
  }

  createOwner(): void {
    if (!this.owner.name || !this.owner.email) {
      this.toastService.showMessage('Necessário preencher os campos obrigatórios');
      return null;
    }
    this.ownerService.create(this.owner).subscribe(() => {
      this.toastService.showMessage('Dono cadastrado');
      this.router.navigate(['/owner']);
    });
  }

}
