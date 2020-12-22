import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VisualizarComponent} from './visualizar.component';

describe('VisualizarComponent', () => {
  let component: VisualizarComponent;
  let fixture: ComponentFixture<VisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
