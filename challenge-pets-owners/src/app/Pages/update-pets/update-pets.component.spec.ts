import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePetsComponent } from './update-pets.component';

describe('UpdatePetsComponent', () => {
  let component: UpdatePetsComponent;
  let fixture: ComponentFixture<UpdatePetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
