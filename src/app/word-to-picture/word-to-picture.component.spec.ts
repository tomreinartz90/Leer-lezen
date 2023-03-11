import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordToPictureComponent } from './word-to-picture.component';

describe('WordToPictureComponent', () => {
  let component: WordToPictureComponent;
  let fixture: ComponentFixture<WordToPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordToPictureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordToPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
