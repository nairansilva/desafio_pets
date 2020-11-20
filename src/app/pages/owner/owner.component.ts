import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent, DialogComponentModel } from 'src/app/components/dialog/dialog.component';
import Owner from 'src/app/models/Owner';
import { OwnerService } from 'src/app/services/owner.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  owners: Owner[];
  displayedColumns = ['id', 'name', 'email', 'phone', 'action'];
  isLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private ownerService: OwnerService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    try {
      this.ownerService.getAll().subscribe(owners => {
        this.owners = owners;
      });
    } catch (err) {
      this.toastService.showMessage(err);
    }
    finally {
      this.isLoading = false;
    }
  }


  confirmDialog(id: string): void {
    const title = `Excluir`;
    const message = "Tem certeza que deseja continuar?";
    
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "400px",
      data: {title, message, action: 'Excluir'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        try{
          this.ownerService.delete(id).subscribe(() => {
            this.toastService.showMessage('Dono excluído com sucesso!');
          });
          this.owners = this.owners.filter(owner => {
            return owner.id !== id;
          });
        } catch(err) {
          this.toastService.showMessage('Ocorreu um erro ao excluir o dono');
        }
      }
    });
  }

}
