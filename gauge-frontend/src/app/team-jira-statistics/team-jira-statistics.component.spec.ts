import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamJiraStatisticsComponent } from './team-jira-statistics.component';

describe('TeamJiraStatisticsComponent', () => {
  let component: TeamJiraStatisticsComponent;
  let fixture: ComponentFixture<TeamJiraStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamJiraStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamJiraStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
