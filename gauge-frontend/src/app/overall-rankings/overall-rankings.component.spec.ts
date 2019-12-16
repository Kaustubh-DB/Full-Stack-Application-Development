import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallRankingsComponent } from './overall-rankings.component';

describe('OverallRankingsComponent', () => {
  let component: OverallRankingsComponent;
  let fixture: ComponentFixture<OverallRankingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallRankingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
