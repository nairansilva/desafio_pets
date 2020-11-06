import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDonosComponent } from './perfil-donos.component';

describe('PerfilDonosComponent', () => {
  let component: PerfilDonosComponent;
  let fixture: ComponentFixture<PerfilDonosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilDonosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
