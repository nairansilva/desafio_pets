import { Component, OnInit } from '@angular/core';
import { PoNavbarItem } from '@po-ui/ng-components';
import { DonosService } from '../../services/donos.service';
import { PetsService } from '../../services/pets.service';
import { DogBreedsService } from '../../services/dogBreeds.service';
import { CatBreedsService } from '../../services/catBreeds.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  items: Array<any>;
  isHideLoading = true;
  donos: string;
  pets: string;
  catEspecies: string;
  dogEspecies: string;

  constructor(
    private donosService: DonosService,
    private petsService: PetsService,
    private dogBreedsService: DogBreedsService,
    private catBreedsService: CatBreedsService,
  ) { }

  listDonos(): any {
    this.isHideLoading = false;

    this.donosService.getDonos().subscribe(data => {
      this.donos = data.length.toString();

      this.isHideLoading = true;
    }, error => {
      console.log(error);
    });
  }

  listPets(): any {
    this.isHideLoading = false;
    let petsQtd = [];

    this.donosService.getDonos().subscribe((dataOwner) => {
      dataOwner.map((mapDataOwner) => {
        this.donosService.getDonoPets(mapDataOwner.id).subscribe((dataPets) => {
          dataPets.map((mapDataPets) => {
            petsQtd.push(mapDataPets.id);
          });

          this.pets = petsQtd.length.toString();
        }, error => {
          console.log(error);
        });
      });
    }, error => {
      console.log(error);
    });
  }

  listDogEspecies(): any {
    this.isHideLoading = false;

    this.dogBreedsService.getDogBreeds().subscribe(data => {
      this.dogEspecies = data.length.toString();

      this.isHideLoading = true;
    }, error => {
      console.log(error);
    });
  }

  listCatEspecies(): any {
    this.isHideLoading = false;

    this.catBreedsService.getCatBreeds().subscribe(data => {
      this.catEspecies = data.length.toString();

      this.isHideLoading = true;
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.listDonos();
    this.listPets();
    this.listCatEspecies();
    this.listDogEspecies();
  }

}


