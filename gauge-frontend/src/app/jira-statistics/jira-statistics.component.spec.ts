import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraStatisticsComponent } from './jira-statistics.component';

describe('JiraStatisticsComponent', () => {
  let component: JiraStatisticsComponent;
  let fixture: ComponentFixture<JiraStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JiraStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JiraStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
