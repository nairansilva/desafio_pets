import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import Pet from 'src/app/models/Pet';
import { PetService } from 'src/app/services/pet.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {
  pets: Pet[];
  displayedColumns = ['id', 'name', 'nickName', 'breed', 'species', 'action'];
  isLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private petService: PetService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    try {
      this.petService.getAll().subscribe(pets => {
        this.pets = pets;
      })
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
      data: { title, message, action: 'Excluir' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.petService.delete(id).subscribe(() => {
            this.toastService.showMessage('Pet excluído com sucesso!');
          });
          this.pets = this.pets.filter(pet => {
            return pet.id !== id;
          });
        } catch (err) {
          this.toastService.showMessage('Ocorreu um erro ao excluir o pet');
        }
      }
    });
  }

}
