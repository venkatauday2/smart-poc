import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItenaryWidgetComponent } from './itenary-widget.component';

describe('ItenaryWidgetComponent', () => {
  let component: ItenaryWidgetComponent;
  let fixture: ComponentFixture<ItenaryWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItenaryWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItenaryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
