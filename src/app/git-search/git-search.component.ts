import { Component, OnInit, Input } from "@angular/core";
import { GitSearchService } from "../git-search.service";
import { Observable, Subject, of, empty } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith
} from "rxjs/operators";
import {
  Repository,
  RepositoryItem,
  Issue,
  IssueItem
} from "../app.interfaces";
import { Const } from "../app.constants";

@Component({
  selector: "app-git-search",
  templateUrl: "./git-search.component.html",
  styleUrls: ["./git-search.component.scss"]
})
export class GitSearchComponent implements OnInit {
  private showResultPanel: boolean = true;
  private issues: Issue;
  private searchTerms = new Subject<string>();
  private loadingIssue: boolean = false;
  private data: Array<any>;
  private colors = ['#57A1C6', '#4FC3F7', '#36D7B7'];

  public repos$: Observable<Repository[]>;
  public selectedItem: RepositoryItem;
  public issuePanelState: boolean = false;

  constructor(private _gitSearchService: GitSearchService) {
    this.selectedItem = Const.DEFAULT_REPO_ITEM;
    this.issues = Const.DEFAULT_ISSUE_ITEM;
  }

  public search(term: string): void {
    this.setFormToDefaultState();
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.repos$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((param: string) => this._gitSearchService.searchRepoData(param))
    );
  }

  private setSelectedItem(item): void {
    this.selectedItem = item;
    this.searchTerms.next("");
  }

  private setFormToDefaultState(): void {
    this.selectedItem = Const.DEFAULT_REPO_ITEM;
    this.issues = Const.DEFAULT_ISSUE_ITEM;
    this.showIssues(false);
  }

  public showIssues(state): void {
    this.issuePanelState = state;
    if (state && this.selectedItem.id > 0) {
      this.getIssues();
    }
  }

  private getIssues(): void {
    this.loadingIssue = true;
    this._gitSearchService
      .getIssues(this.selectedItem["full_name"])
      .subscribe(result => (this.issues = result), err => console.log(err), ()=>this.loadingIssue = false);
  }
}
