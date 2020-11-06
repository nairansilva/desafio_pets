import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {
  PoNavbarItem,
  PoTableColumn,
  PoTableAction,
  PoModalComponent,
  PoModalAction,
  PoDynamicFormField,
  PoDynamicFormComponent,
  PoNavbarIconAction,
  PoDialogService,
  PoComboOption
} from '@po-ui/ng-components';
import { PetsService } from '../../services/pets.service';
import { DonosService } from '../../services/donos.service';
import { DogBreedsService } from '../../services/dogBreeds.service';
import { CatBreedsService } from '../../services/catBreeds.service';

@Component({
  selector: 'app-cadastro-pets',
  templateUrl: './cadastro-pets.component.html',
  styleUrls: ['./cadastro-pets.component.css']
})
export class CadastroPetsComponent implements OnInit {

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
      property: 'id_dono',
      label: 'ID do Dono',
      type: 'string',
      visible: false
    },
    {
      property: 'nome',
      label: 'Nome',
      type: 'string'
    },
    {
      property: 'apelido',
      label: 'Apelido',
      type: 'string'
    },
    {
      property: 'raca',
      label: 'Raça',
      type: 'string'
    },
    {
      property: 'especie',
      label: 'Espécie',
      type: 'string'
    },
    {
      property: 'nome_dono',
      label: 'Nome do Dono',
      type: 'string'
    },
    {
      property: 'telefone_dono',
      label: 'Telefone do Dono',
      type: 'string'
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
      divider: 'CADASTRO DE PETS',
      label: 'ID',
      required: false,
      disabled: true,
      order: 1
    },
    {
      property: 'id_dono',
      label: 'ID do Dono',
      required: false,
      disabled: true,
      order: 2
    },
    {
      property: 'nome',
      label: 'Nome',
      required: true,
      maxLength: 70,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 3
    },
    {
      property: 'apelido',
      label: 'Apelido',
      required: true,
      maxLength: 70,
      gridColumns: 6,
      gridSmColumns: 12,

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
      property: 'raca',
      label: 'Raça',
      required: true,
      maxLength: 70,
      gridColumns: 6,
      gridSmColumns: 12,
      type: 'number'
    },
    {
      property: 'especie',
      label: 'Espécie',
      required: true,
      maxLength: 70,
      gridColumns: 6,
      type: 'number'
    },
    {
      property: 'tamanho',
      label: 'Tamanho',
      required: true,
      maxLength: 70,
      gridColumns: 6,
      type: 'number'
    }
  ]

  items: Array<any>;
  listaDonos: string;
  detail: any;
  racasDisabled = true;
  isHideLoading = true;
  values: any;
  newPetForm: FormGroup;
  editPetForm: FormGroup;
  donosOptions: Array<PoComboOption>;
  racasOptions: Array<PoComboOption>;
  especiesOptions: Array<PoComboOption>;

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
      this.newPetSave();
      this.newModal.close();
    },
    label: 'Salvar'
  };

  @ViewChild('detailModal', { static: true }) detailModal: PoModalComponent;
  @ViewChild('editModal', { static: true }) editModal: PoModalComponent;
  @ViewChild('newModal', { static: true }) newModal: PoModalComponent;
  @ViewChild('editForm', { static: true }) formEdit: PoDynamicFormComponent;

  constructor(
    private petsService: PetsService,
    private donosService: DonosService,
    private dogBreedsService: DogBreedsService,
    private catBreedsService: CatBreedsService,
    private formBuilder: FormBuilder,
    private poAlert: PoDialogService
  ) {
    this.petForm();
  }

  listPets(): any {
    this.isHideLoading = false;
    let pets = [];

    this.donosService.getDonos().subscribe((dataOwner) => {
      dataOwner.map((mapDataOwner) => {
        this.donosService.getDonoPets(mapDataOwner.id).subscribe((dataPets) => {
          dataPets.map((mapDataPets) => {
            pets.push({
              id: mapDataPets.id,
              id_dono: mapDataPets.ownerId,
              nome: mapDataPets.name,
              apelido: mapDataPets.nickName,
              nascimento: new Date(mapDataPets.birthday).toLocaleDateString("pt-BR"),
              raca: mapDataPets.breed,
              especie: (mapDataPets.species === 1) ? 'Cachorro' : 'Gato',
              tamanho: mapDataPets.size,
              nome_dono: mapDataOwner.name,
              telefone_dono: mapDataOwner.phone
            });
          });

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
        });

        this.isHideLoading = true;
      });

      this.items = pets;
    }, error => {
      console.log(error);
    });
  }

  details(item) {
    this.isHideLoading = false;
    this.detail = {};

    this.petsService.getPet({ id: item.id, id_dono: item.id_dono }).subscribe(dataPet => {
      dataPet.birthday = new Date(dataPet.birthday).toLocaleDateString("pt-BR");
      dataPet.species = (dataPet.species === 1) ? 'Cachorro' : 'Gato';
      dataPet.breed.toString();
      dataPet.size.toString();

      this.donosService.getDono(dataPet.ownerId).subscribe(dataOwner => {
        dataOwner.birthday = new Date(dataOwner.birthday).toLocaleDateString("pt-BR");

        this.detail = {
          pet: dataPet,
          dono: dataOwner
        };
      });

      if (dataPet.species === 'Cachorro') {
        this.dogBreedsService.getDogBreed(dataPet.breed).subscribe(dataBreed => {
          this.detail.pet.breed = dataBreed.name;
        });
      } else if (dataPet.species === 'Gato') {
        this.catBreedsService.getCatBreed(dataPet.breed).subscribe(dataBreed => {
          this.detail.pet.breed = dataBreed.name;
        });
      }

      this.isHideLoading = true;

      this.detailModal.open();
    }, error => {
      console.log(error);
      this.isHideLoading = true;
    });
  }

  newPetSave() {
    if (this.newPetForm.valid) {
      this.confirmDialog({
        title: 'Novo Pet' ,
        message: 'Você confirma o cadastro do novo Pet?',
        confirm: () => {
          this.isHideLoading = false;

          this.petsService.postPet(this.newPetForm.value).subscribe(() => {
            this.petForm();
            this.newPetForm.reset();
            this.listPets();
          }, error => {
            console.log(error);
          });

          this.isHideLoading = true;
        },
        cancel: () => {}
      });
    } else {
      this.alertDialog({
        title: 'Atenção!' ,
        message: 'Todos os campos são obrigatórios. Preencha todos!'
      });
      this.editPetForm.reset;
    }
  }

  petForm() {
    this.newPetForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      apelido: [null, [Validators.required, Validators.minLength(3)]],
      nascimento: [null, Validators.required],
      raca: [null, Validators.required],
      especie: [null, Validators.required],
      tamanho: [null, Validators.required],
      id_dono: [null, Validators.required],
      nome_dono: [null, Validators.required],
      telefone_dono: [null, Validators.required],
    });

    this.editPetForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      apelido: [null, [Validators.required, Validators.minLength(3)]],
      nascimento: [null, Validators.required],
      raca: [null, Validators.required],
      especie: [null, Validators.required],
      tamanho: [null, Validators.required],
      id_dono: [null] ,
      nome_dono: [null],
      telefone_dono: [null],
    });
  }

  newPet() {
    this.listEspecies();
    this.listDonos();
    this.newModal.open();
  }

  listDonos(): any {
    this.isHideLoading = false;
    let donos = [];

    this.donosService.getDonos().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        donos.push({
          label: data[i].name,
          value: data[i].id
        });
      }

      this.donosOptions = donos;
      this.isHideLoading = true;
    }, error => {
      console.log(error);
    });
  }

  listRacas(especie): any {
    let racas = []
    if (especie === '1') {
      this.dogBreedsService.getDogBreeds().subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          racas.push({
            label: data[i].name,
            value: data[i].id
          });
        }

        this.racasDisabled = false;
        this.racasOptions = racas;
      }, error => {
        console.log(error);
      });
    } else if (especie === '2') {
      this.catBreedsService.getCatBreeds().subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          racas.push({
            label: data[i].name,
            value: data[i].id
          });
        }

        this.racasDisabled = false;
        this.racasOptions = racas;
      }, error => {
        console.log(error);
      });
    }

    this.isHideLoading = true;
  }

  listEspecies(): any {
    this.especiesOptions = [
      {
        label: 'Cachorro',
        value: '1'
      },
      {
        label: 'Gato',
        value: '2'
      }
    ]
  }

  onChangeDono(dono) {
    if (dono != undefined && dono != '' && dono != null) {
      this.donosService.getDono(dono).subscribe((data) => {
          this.newPetForm.setValue({
            nome: this.newPetForm.value.nome,
            apelido: this.newPetForm.value.apelido,
            nascimento: this.newPetForm.value.nascimento,
            raca: this.newPetForm.value.raca,
            especie: this.newPetForm.value.especie,
            tamanho: this.newPetForm.value.tamanho,
            nome_dono: this.newPetForm.value.nome_dono,
            id_dono: data.id,
            telefone_dono: data.phone
          });
      });
    }
  }

  onChangeEspecie(especie) {
    this.racasDisabled = true;
    this.listRacas(especie);
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

  edit(item) {
    this.isHideLoading = false;
    this.detail = {};

    this.listEspecies();

    this.petsService.getPet({ id: item.id, id_dono: item.id_dono }).subscribe(dataPet => {
      dataPet.birthday = new Date(dataPet.birthday).toLocaleDateString("pt-BR");
      dataPet.species = (dataPet.species === 1) ? 'Cachorro' : 'Gato';
      dataPet.breed.toString();
      dataPet.size.toString();

      this.donosService.getDono(dataPet.ownerId).subscribe(dataOwner => {
        dataOwner.birthday = new Date(dataOwner.birthday).toLocaleDateString("pt-BR");

        this.editPetForm.setValue({
          id: dataPet.id,
          nome: dataPet.name,
          apelido: dataPet.nickName,
          nascimento: dataPet.birthday,
          raca: dataPet.breed,
          especie: dataPet.species,
          tamanho: dataPet.size,
          id_dono: dataOwner.id,
          nome_dono: dataOwner.name,
          telefone_dono: dataOwner.phone
        });
        });

      this.isHideLoading = true;

      this.editModal.open();
    }, error => {
      console.log(error);
      this.isHideLoading = true;
    });
  }

  saveEdit() {
    if (this.editPetForm.valid) {
      this.confirmDialog({
        title: 'Alterar Pet' ,
        message: 'Você deseja salvar essa alteração?',
        confirm: () => {
          this.isHideLoading = false;

          this.petsService.putPet(this.editPetForm.value).subscribe(() => {
            this.petForm();
            this.listPets();
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
      this.editPetForm.reset();
    }
  }

  delete(item) {
    this.detail = {};

    this.confirmDialog({
      title: 'Excluir' ,
      message: 'Você deseja exluir esse cadastro?',
      confirm: () => {
        this.petsService.deletePet({ id: item.id, id_dono: item.id_dono }).subscribe(() => {
          this.petForm();
          this.listPets();
        }, error => {
          console.log(error);
        });
      },
      cancel: () => {}
    });
  }

  ngOnInit() {
    this.listPets();
  }
}
