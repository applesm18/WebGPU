import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookComponent } from './playbook.component';

describe('PlaybookComponent', () => {
  let component: PlaybookComponent;
  let fixture: ComponentFixture<PlaybookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaybookComponent]
    });
    fixture = TestBed.createComponent(PlaybookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
