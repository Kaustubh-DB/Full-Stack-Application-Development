import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonarqubeStatisticsComponent } from './sonarqube-statistics.component';

describe('SonarqubeStatisticsComponent', () => {
  let component: SonarqubeStatisticsComponent;
  let fixture: ComponentFixture<SonarqubeStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonarqubeStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonarqubeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
