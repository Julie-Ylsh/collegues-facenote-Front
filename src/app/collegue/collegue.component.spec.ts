import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegueComponent } from './collegue.component';

describe('CollegueComponent', () => {
  let component: CollegueComponent;
  let fixture: ComponentFixture<CollegueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
