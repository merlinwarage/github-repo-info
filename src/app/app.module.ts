import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { GitSearchComponent } from "./git-search/git-search.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule
} from "@angular/material";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { FilterPipe, SortByPipe, SumPipe } from "./app.pipes";
import { GitChartsComponent } from './git-charts/git-charts.component';


@NgModule({
  declarations: [AppComponent, GitSearchComponent, FilterPipe, SortByPipe, SumPipe, GitChartsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
