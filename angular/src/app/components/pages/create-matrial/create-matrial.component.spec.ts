import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMatrialComponent } from './create-matrial.component';

describe('CreateMatrialComponent', () => {
  let component: CreateMatrialComponent;
  let fixture: ComponentFixture<CreateMatrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMatrialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMatrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
