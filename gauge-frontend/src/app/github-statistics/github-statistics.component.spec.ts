import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubStatisticsComponent } from './github-statistics.component';

describe('GithubStatisticsComponent', () => {
  let component: GithubStatisticsComponent;
  let fixture: ComponentFixture<GithubStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
