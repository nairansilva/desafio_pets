import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonoComponent } from './dono.component';

describe('DonoComponent', () => {
  let component: DonoComponent;
  let fixture: ComponentFixture<DonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
