import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBambooStatisticsComponent } from './team-bamboo-statistics.component';

describe('TeamBambooStatisticsComponent', () => {
  let component: TeamBambooStatisticsComponent;
  let fixture: ComponentFixture<TeamBambooStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamBambooStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamBambooStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
