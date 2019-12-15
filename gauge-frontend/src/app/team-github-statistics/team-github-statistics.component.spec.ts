import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGithubStatisticsComponent } from './team-github-statistics.component';

describe('TeamGithubStatisticsComponent', () => {
  let component: TeamGithubStatisticsComponent;
  let fixture: ComponentFixture<TeamGithubStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamGithubStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGithubStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
