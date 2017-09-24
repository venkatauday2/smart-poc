import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateItineraryFormComponent } from './add-update-itinerary-form.component';

describe('AddUpdateItineraryFormComponent', () => {
  let component: AddUpdateItineraryFormComponent;
  let fixture: ComponentFixture<AddUpdateItineraryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateItineraryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateItineraryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
