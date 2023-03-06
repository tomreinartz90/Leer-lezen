import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureToWordComponent } from './picture-to-word.component';

describe('PictureToWordComponent', () => {
  let component: PictureToWordComponent;
  let fixture: ComponentFixture<PictureToWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureToWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureToWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
