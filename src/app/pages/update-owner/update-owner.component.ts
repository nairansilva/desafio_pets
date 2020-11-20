import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import Owner from 'src/app/models/Owner';
import { OwnerService } from 'src/app/services/owner.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-update-owner',
  templateUrl: './update-owner.component.html',
  styleUrls: ['./update-owner.component.scss']
})
export class UpdateOwnerComponent implements OnInit {
  owner: Owner;

  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private toastService: ToastService,
    private ownerService: OwnerService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.ownerService.getById(id).subscribe(owner => {
      this.owner = owner;
    });
  }

  updateOwner(): void {
    this.ownerService.update(this.owner).subscribe(() => {
      this.toastService.showMessage('Dono atualizado!');
      this.router.navigate(['/owner']);
    });
  }

  confirmDialog(): void {
    const title = `Alterar`;
    const message = "Tem certeza que deseja continuar?";
    
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "400px",
      data: {title, message, action: 'Alterar'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        try{
          this.updateOwner();
        } catch(err) {
          this.toastService.showMessage('Ocorreu um erro ao excluir o dono');
        }
      }
    });
  }

}
