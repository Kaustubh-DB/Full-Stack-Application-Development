import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BambooStatisticsComponent } from './bamboo-statistics.component';

describe('BambooStatisticsComponent', () => {
  let component: BambooStatisticsComponent;
  let fixture: ComponentFixture<BambooStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BambooStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BambooStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
