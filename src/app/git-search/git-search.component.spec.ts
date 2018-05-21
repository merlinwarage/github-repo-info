import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitSearchComponent } from './git-search.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { GitChartsComponent } from '../git-charts/git-charts.component';
import { FilterPipe, SortByPipe, SumPipe } from "../app.pipes";
import { HttpClientModule } from "@angular/common/http";

describe('GitSearchComponent', () => {
  let component: GitSearchComponent;
  let fixture: ComponentFixture<GitSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitSearchComponent, GitChartsComponent, FilterPipe, SortByPipe, SumPipe ],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        AngularFontAwesomeModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it("function toPercent should return valid calculation", () => {
  //   spyOn(component, "transformGitUrl").and.callThrough();

  //   const result = component.transformGitUrl('https://api.github.com/repo/username/repname');

  //   expect(component.transformGitUrl).toHaveBeenCalled();
  //   expect(result).toEqual("https://github.com/username/repname");
  // });
});
