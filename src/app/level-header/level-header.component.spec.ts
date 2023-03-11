import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelHeaderComponent } from './level-header.component';

describe('LevelHeaderComponent', () => {
  let component: LevelHeaderComponent;
  let fixture: ComponentFixture<LevelHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
