import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingLettersComponent } from './missing-letters.component';

describe('MissingLettersComponent', () => {
  let component: MissingLettersComponent;
  let fixture: ComponentFixture<MissingLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingLettersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
