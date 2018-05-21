import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GitChartsComponent } from "./git-charts.component";

import {
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule
} from "@angular/material";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { GitSearchComponent } from "../git-search/git-search.component";
import { FilterPipe, SortByPipe, SumPipe } from "../app.pipes";

import * as d3 from "d3";
import * as _ from "underscore";

const mockData = [
  {
    title: "Update the README or samples with instructions for Elixir.",
    state: "open",
    created_at: "2018-04-10T16:12:28Z",
    updated_at: "2018-04-10T18:02:43Z",
    body:
      "I have been trying to use the Elixir sample but it doesn't seem to stay running. I can only seem to get it working inside of spawn.\r\n\r\nI've looked at https://github.com/xerions/exradius as well but again can only keep things running inside a spawn.\r\n\r\nI'm sure there's just something dumb I am missing. But I have no idea what. I've done this:\r\n```\r\n  Instead of :application.ensure_all_started(:eradius)\r\n  add :eradius to :applications\r\n\r\n  Instead of spawn, simply add :eradius.modules_ready([__MODULE__]) to your Application\r\n  start/2 callback.\r\n```\r\n\r\nand copied the config.\r\n\r\nAny suggestions would be appreciated. I'm willing to help update the docs once I determine what's wrong.\r\n"
  },
  {
    title: "Update the README or samples with instructions for Elixir.",
    state: "open",
    created_at: "2018-04-10T16:12:28Z",
    updated_at: "2018-04-10T18:02:43Z",
    body:
      "I have been trying to use the Elixir sample but it doesn't seem to stay running. I can only seem to get it working inside of spawn.\r\n\r\nI've looked at https://github.com/xerions/exradius as well but again can only keep things running inside a spawn.\r\n\r\nI'm sure there's just something dumb I am missing. But I have no idea what. I've done this:\r\n```\r\n  Instead of :application.ensure_all_started(:eradius)\r\n  add :eradius to :applications\r\n\r\n  Instead of spawn, simply add :eradius.modules_ready([__MODULE__]) to your Application\r\n  start/2 callback.\r\n```\r\n\r\nand copied the config.\r\n\r\nAny suggestions would be appreciated. I'm willing to help update the docs once I determine what's wrong.\r\n"
  },
  {
    title: "dropped packets metric is a response metric",
    state: "closed",
    created_at: "2018-03-09T07:48:59Z",
    updated_at: "2018-03-09T09:20:04Z",
    body:
      "see https://github.com/travelping/eradius/blob/master/src/eradius_client.erl#L134"
  }
];

describe("GitChartsComponent", () => {
  let component: GitChartsComponent;
  let fixture: ComponentFixture<GitChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GitChartsComponent,
        GitSearchComponent,
        FilterPipe,
        SortByPipe,
        SumPipe
      ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        AngularFontAwesomeModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitChartsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    component = null;
  });

  it("Component should be successfully created", () => {
    expect(component).toBeTruthy();
  });

  it("#updateSlices should return valid data", () => {
    spyOn(component, "updateSlices").and.callThrough();

    const result = component.updateSlices(mockData);

    expect(component.updateSlices).toHaveBeenCalled();
    expect(result[0].amount).toEqual(1);
    expect(result[1].amount).toEqual(2);
  });

  it("#toPercent should return valid calculation", () => {
    spyOn(component, "toPercent").and.callThrough();

    const result = component.toPercent(50, 100);

    expect(component.toPercent).toHaveBeenCalled();
    expect(result).toEqual("50%");
  });
});
