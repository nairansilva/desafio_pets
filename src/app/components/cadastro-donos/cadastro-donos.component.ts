import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PoNavbarItem,
  PoTableColumn,
  PoTableAction,
  PoModalComponent,
  PoModalAction,
  PoDynamicFormField,
  PoDynamicFormComponent,
  PoNavbarIconAction,
  PoDialogService
} from '@po-ui/ng-components';
import { DonosService } from '../../services/donos.service';
import { PetsService } from '../../services/pets.service';
import { DogBreedsService } from '../../services/dogBreeds.service';
import { CatBreedsService } from '../../services/catBreeds.service';

@Component({
  selector: 'app-cadastro-donos',
  templateUrl: './cadastro-donos.component.html',
  styleUrls: ['./cadastro-donos.component.css']
})
export class CadastroDonosComponent implements OnInit {

  readonly menus: Array<PoNavbarItem> = [
    {
      label: 'Início',
      link: '/home'
    },
    {
      label: 'Pets',
      link: '/cadastro-pets'
    },
    {
      label: 'Donos',
      link: '/cadastro-donos'
    }
  ]

  teste: Array<PoNavbarIconAction> = [
    {
      label: 'teste',
      icon: 'po-icon-archive'
    },
    {
      label: 'teste2',
      icon: 'po-icon-archive'
    },
    {
      label: 'teste3',
      icon: 'po-icon-archive'
    }
  ]

  columns: Array<PoTableColumn> = [
    {
      property: 'id',
      label: 'ID',
      type: 'string',
      visible: false
    },
    {
      property: 'nome',
      label: 'Nome',
      type: 'string'
    },
    {
      property: 'email',
      label: 'E-mail',
      type: 'string'
    },
    {
      property: 'telefone',
      label: 'Telefone',
      type: 'string'
    },
    { property: 'pets',
      label: 'Pets',
      type: 'detail',
      detail: {
        columns: [
          {
            property: 'nome',
            label: 'Nome'
          },
          {
            property: 'apelido',
            label: 'Apelido'
          },
          {
            property: 'raca',
            label: 'Raça',
          },
          {
            property: 'especie',
            label: 'Espécie',
          }
        ],
        typeHeader: 'inline'
      }
    }
  ]

  actions: Array<PoTableAction> = [
    {
      label: 'Detalhes',
      action: this.details.bind(this),
      icon: 'po-icon-info'
    },
    {
      label: 'Alterar',
      action: this.edit.bind(this),
      icon: 'po-icon-edit'
    },
    {
      label: 'Excluir',
      action: this.delete.bind(this),
      icon: 'po-icon-delete'
    }
  ]

  fields: Array<PoDynamicFormField> = [
    {
      property: 'id',
      divider: 'CADASTRO DE DONOS',
      label: 'ID',
      required: false,
      disabled: true,
      order: 1
    },
    {
      property: 'nome',
      label: 'Nome',
      required: true,
      maxLength: 70,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 2
    },
    {
      property: 'nascimento',
      label: 'Nascimento',
      required: true,
      maxLength: 70,
      gridColumns: 4,
      type: 'date',
      format: 'dd/mm/yyyy'
    },
    {
      property: 'email',
      label: 'E-mail',
      required: true,
      maxLength: 70,
      gridColumns: 6,
      gridSmColumns: 12,
    },
    {
      property: 'telefone',
      label: 'Telefone',
      required: true,
      mask: '(99) 99999-9999',
      gridColumns: 4,
    },
    {
      property: 'endereco',
      label: 'Endereço',
      required: true,
      maxLength: 70,
      gridColumns: 6,
    },
  ]

  items: Array<any>;
  detail: any;
  isHideLoading = true;
  values: any;
  newOwnerForm: FormGroup;
  editOwnerForm: FormGroup;

  detailClose: PoModalAction = {
    action: () => {
      this.detailModal.close();
    },
    label: 'Fechar'
  };

  editCancel: PoModalAction = {
    action: () => {
      this.editModal.close();
    },
    label: 'Cancelar',
    danger: true
  };

  editSave: PoModalAction = {
    action: () => {
      this.saveEdit();
      this.editModal.close();
    },
    label: 'Salvar'
  };

  newCancel: PoModalAction = {
    action: () => {
      this.newModal.close();
    },
    label: 'Cancelar',
    danger: true
  };

  newSave: PoModalAction = {
    action: () => {
      this.newOwnerSave();
      this.newModal.close();
    },
    label: 'Salvar'
  };

  @ViewChild('detailModal', { static: true }) detailModal: PoModalComponent;
  @ViewChild('editModal', { static: true }) editModal: PoModalComponent;
  @ViewChild('newModal', { static: true }) newModal: PoModalComponent;
  @ViewChild('editForm', { static: true }) formEdit: PoDynamicFormComponent;

  constructor(
    private donosService: DonosService,
    private petsService: PetsService,
    private formBuilder: FormBuilder,
    private poAlert: PoDialogService,
    private dogBreedsService: DogBreedsService,
    private catBreedsService: CatBreedsService,
  ) {
    this.ownerForm();
  }

  listDonos(): any{
    this.isHideLoading = false;
    let donos = [];

    this.donosService.getDonos().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        donos.push({
          id: data[i].id,
          nome: data[i].name,
          email: data[i].email,
          telefone: data[i].phone,
          pets: [
            {
              nome: '',
              apelido: '',
              raca: '',
              especia: ''
            }
          ]
        })
      }

      this.items = donos;
      this.isHideLoading = true;
    }, error => {
      console.log(error);
    });
  }

  details(item) {
    this.isHideLoading = false;
    this.detail = {};

    this.donosService.getDono(item.id).subscribe(data => {
      data.birthday = new Date(data.birthday).toLocaleDateString("pt-BR")
      this.detail = data;
      this.isHideLoading = true;

      this.detailModal.open();
    }, error => {
      console.log(error);
      this.isHideLoading = true;
    });
  }

  edit(item) {
    this.isHideLoading = false;
    this.detail = {};

    this.donosService.getDono(item.id).subscribe(data => {
      data.birthday = new Date(data.birthday).toLocaleDateString("pt-BR")
      this.detail = data;
      this.isHideLoading = true;

      this.editOwnerForm.setValue({
        id: this.detail.id,
        nome: this.detail.name,
        nascimento: this.detail.birthday,
        telefone: this.detail.phone,
        endereco: this.detail.address,
        email: this.detail.email,
      });

      this.editModal.open();
    }, error => {
      console.log(error);
      this.isHideLoading = true;
    });
  }

  saveEdit() {
    if (this.editOwnerForm.valid) {
      this.confirmDialog({
        title: 'Alterar' ,
        message: 'Você deseja salvar essa alteração?',
        confirm: () => {
          this.isHideLoading = false;

          this.donosService.putDono(this.editOwnerForm.value).subscribe(() => {
            this.ownerForm();
            this.listDonos();
            this.isHideLoading = true;
          }, error => {
            console.log(error);
            this.isHideLoading = true;
          });
        },
        cancel: () => {}
      });
    } else {
      this.alertDialog({
        title: 'Atenção!' ,
        message: 'Todos os campos são obrigatórios. Preencha todos!'
      });
    }
  }

  newOwnerSave() {
    if (this.newOwnerForm.valid) {
      this.confirmDialog({
        title: 'Novo Dono' ,
        message: 'Você confirma o cadastro do novo Dono?',
        confirm: () => {
          this.isHideLoading = false;

          this.donosService.postDono(this.newOwnerForm.value).subscribe(() => {
            this.ownerForm();
            this.listDonos();
            this.isHideLoading = true;
          }, error => {
            this.isHideLoading = true;
          });
        },
        cancel: () => {}
      });
    } else {
      this.alertDialog({
        title: 'Atenção!' ,
        message: 'Todos os campos são obrigatórios. Preencha todos!'
      });
    }
  }

  ownerForm() {
    this.newOwnerForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      nascimento: [null, Validators.required],
      telefone: [null, Validators.required],
      endereco: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });

    this.editOwnerForm = this.formBuilder.group({
      id: [null, Validators.required],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      nascimento: [null, Validators.required],
      telefone: [null, Validators.required],
      endereco: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  delete(item) {
    this.detail = {};

    this.confirmDialog({
      title: 'Excluir' ,
      message: 'Você deseja exluir esse cadastro?',
      confirm: () => {
        this.donosService.deleteDono(item.id).subscribe(() => {
          this.ownerForm();
          this.listDonos();
        }, error => {
          console.log(error);
        });
      },
      cancel: () => {}
    });
  }

  newOwner() {
    this.newModal.open();
  }

  confirmDialog({ title, message, confirm, cancel }) {
    this.poAlert.confirm({
      title,
      message,
      confirm,
      cancel
    });
  }

  alertDialog({ title, message }) {
    this.poAlert.alert({
      title,
      message,
    });
  }

  onExpandPets(dono) {
    this.isHideLoading = false;
    let pets = []

    this.donosService.getDonoPets(dono.id).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        pets.push({
          nome: data[i].name,
          apelido: data[i].nickName,
          raca: data[i].breed.toString(),
          especie: (data[i].species === 1) ? 'Cachorro' : 'Gato'
        });
      }

      if (pets.length > 0) {
        pets.map((dataPets) => {
          if (dataPets.especie === 'Cachorro') {
            this.dogBreedsService.getDogBreed(dataPets.raca).subscribe((dataBreed) => {
              dataPets.raca = dataBreed.name;
            });
          } else if (dataPets.especie === 'Gato') {
            this.catBreedsService.getCatBreed(dataPets.raca).subscribe((dataBreed) => {
              dataPets.raca = dataBreed.name;
            });
          }
        });

        dono.pets = pets;
      }

      this.isHideLoading = true;
    }, error => {
      this.isHideLoading = true;
    });
  }

  ngOnInit() {
    this.listDonos();
  }
}
