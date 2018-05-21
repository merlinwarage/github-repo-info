import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  Input
} from "@angular/core";
import * as d3 from "d3";
import * as _ from "underscore";
import { SumPipe } from "../app.pipes";

@Component({
  selector: "app-git-charts",
  templateUrl: "./git-charts.component.html",
  styleUrls: ["./git-charts.component.scss"]
})
export class GitChartsComponent implements OnInit, OnChanges {
  @ViewChild("containerPieChart") chartContainer: ElementRef;
  @Input() data: any;
  @Input() colors: Array<string>;

  private hostElement: any;
  private svg: any;
  private radius: number;
  private innerRadius: number;
  private outerRadius: number;
  private htmlElement: HTMLElement;
  private arcGenerator: any;
  private arcHover: any;
  private pieGenerator: any;
  private path: any;
  private values: Array<number>;
  public labels: Array<string>;
  private centralLabel: any;
  private pieColors: any;
  private slices: Array<any>;
  private selectedSlice: any;
  private colorSlices: Array<string>;
  private arc: any;
  private arcEnter: any;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.createChart();
    this.updateChart(true);
    setTimeout(() => this.updateChart(false), 50);
  }

  ngOnChanges() {
    if (this.svg) this.updateChart(false);
  }

  private updateChart = (firstRun: boolean) => {
    const vm = this;

    this.slices = this.updateSlices(this.data);
    this.labels = this.slices.map(slice => slice.state);
    this.colorSlices = this.slices.map(slice => this.pieColors(slice.state));

    this.values = firstRun
      ? [0, 0, 0]
      : _.toArray(this.slices).map(slice => slice.amount);

    this.pieGenerator = d3
      .pie()
      .sort(null)
      .value((d: number) => d)(this.values);

    const arc = this.svg.selectAll(".arc").data(this.pieGenerator);

    arc.exit().remove();

    const arcEnter = arc
      .enter()
      .append("g")
      .attr("class", "arc");

    arcEnter
      .append("path")
      .attr("d", this.arcGenerator)
      .each(values => (firstRun ? (values.storedValues = values) : null))
      .on("mouseover", this.mouseover)
      .on("mouseout", this.mouseout);

    d3
      .select(this.hostElement)
      .selectAll("path")
      .data(this.pieGenerator)
      .attr("fill", (color, index) => this.pieColors(this.labels[index]))
      .attr("d", this.arcGenerator)
      .transition()
      .duration(750)
      .attrTween("d", function(newValues, i) {
        return vm.arcTween(newValues, i, this);
      });
  };

  public updateSlices = (data: Array<any>): Array<any> => {
    const issueStates = _.groupBy(_.sortBy(data, "state"), "state");
    const results = [];

    Object.keys(issueStates).map(state => {
      results.push({
        state: state,
        amount: issueStates[state].length,
        types: []
      });
    });

    return results;
  };

  //************************************** Create Pie Chart

  public createChart = () => {
    this.hostElement = this.chartContainer.nativeElement;

    this.radius =
      Math.min(this.hostElement.offsetWidth, this.hostElement.offsetHeight) / 2;
    const innerRadius = this.radius - 30;
    const outerRadius = this.radius - 15;
    const hoverRadius = this.radius - 5;
    this.pieColors = d3.scaleOrdinal().range(this.colors);

    this.pieGenerator = d3
      .pie()
      .sort(null)
      .value((d: number) => d)([0, 0, 0]);

    this.arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    this.arcHover = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(hoverRadius);

    this.svg = d3
      .select(this.hostElement)
      .append("svg")
      .attr(
        "viewBox",
        "0, 0, " +
          this.hostElement.offsetWidth +
          ", " +
          this.hostElement.offsetHeight
      )
      .append("g")
      .attr(
        "transform",
        `translate(${this.hostElement.offsetWidth / 2}, ${this.hostElement
          .offsetHeight / 2})`
      );
  };

  private arcTween(newValues, i, slice) {
    const interpolation = d3.interpolate(slice.storedValues, newValues);
    slice.storedValues = interpolation(0);

    return t => {
      return this.arcGenerator(interpolation(t));
    };
  }

  private mouseover = (d, i) => {
    this.selectedSlice = this.slices[i];

    d3
      .select(d3.event.currentTarget)
      .transition()
      .duration(200)
      .attr("d", this.arcHover);

    this.svg
      .append("text")
      .attr("dy", "-10px")
      .style("text-anchor", "middle")
      .attr("class", "label")
      .attr("fill", "#57a1c6")
      .text(this.labels[i]);

    this.svg
      .append("text")
      .attr("dy", "20px")
      .style("text-anchor", "middle")
      .attr("class", "percent")
      .attr("fill", "#57a1c6")
      .text(
        this.toPercent(this.values[i], new SumPipe().transform(this.values))
      );
  };

  private mouseout = () => {
    this.svg.select(".label").remove();
    this.svg.select(".percent").remove();

    d3
      .select(d3.event.currentTarget)
      .transition()
      .duration(100)
      .attr("d", this.arcGenerator);
  };

  public toPercent = (a: number, b: number): string => {
    return Math.round(a / b * 100) + "%";
  };
}
