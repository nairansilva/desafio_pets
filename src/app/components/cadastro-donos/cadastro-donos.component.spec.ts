import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDonosComponent } from './cadastro-donos.component';

describe('CadastroDonosComponent', () => {
  let component: CadastroDonosComponent;
  let fixture: ComponentFixture<CadastroDonosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDonosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
