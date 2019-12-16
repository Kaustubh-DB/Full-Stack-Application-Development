import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UploadJsonComponent } from './upload-json/upload-json.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';
import { GithubStatisticsComponent } from './github-statistics/github-statistics.component';
import { JiraStatisticsComponent } from './jira-statistics/jira-statistics.component';
import { BambooStatisticsComponent } from './bamboo-statistics/bamboo-statistics.component';
import { SonarqubeStatisticsComponent } from './sonarqube-statistics/sonarqube-statistics.component';
import { OverallStatisticsComponent } from './overall-statistics/overall-statistics.component';
import { TeamGithubStatisticsComponent } from './team-github-statistics/team-github-statistics.component';
import { TeamBambooStatisticsComponent } from './team-bamboo-statistics/team-bamboo-statistics.component';
import { TeamJiraStatisticsComponent } from './team-jira-statistics/team-jira-statistics.component';
import { OverallRankingsComponent } from './overall-rankings/overall-rankings.component'
@NgModule({
  declarations: [
    AppComponent,
    UploadJsonComponent,
    NavbarComponent,
    ViewAssignmentsComponent,
    GithubStatisticsComponent,
    JiraStatisticsComponent,
    BambooStatisticsComponent,
    SonarqubeStatisticsComponent,
    OverallStatisticsComponent,
    TeamGithubStatisticsComponent,
    TeamBambooStatisticsComponent,
    TeamJiraStatisticsComponent,
    OverallRankingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: UploadJsonComponent
      },
      {
        path: "viewassignments",
        component: ViewAssignmentsComponent
      },
      {
        path: "githubstatistics/:assignment_id",
        component: GithubStatisticsComponent
      },
      {
        path: "jirastatistics/:assignment_id",
        component: JiraStatisticsComponent
      },
      {
        path: "sonarqubestatistics/:assignment_id",
        component: SonarqubeStatisticsComponent
      },
      {
        path: "bamboostatistics/:assignment_id",
        component: BambooStatisticsComponent
      },
      {
        path: "overallstatistics/:assignment_id",
        component: OverallStatisticsComponent
      },
      {
        path: "teamGithubStatistics/:assignment_id/:team_index",
        component: TeamGithubStatisticsComponent
      },
      {
        path: "teamBambooStatistics/:assignment_id/:team_index",
        component: TeamBambooStatisticsComponent
      },
      {
        path: "teamJiraStatistics/:assignment_id/:team_index",
        component: TeamJiraStatisticsComponent
      },
      {
        path: "overallrankings/:assignment_id",
        component: OverallRankingsComponent
      }
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
