import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowItinerariesComponent } from './show-itineraries.component';

describe('ShowItinerariesComponent', () => {
  let component: ShowItinerariesComponent;
  let fixture: ComponentFixture<ShowItinerariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowItinerariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowItinerariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
