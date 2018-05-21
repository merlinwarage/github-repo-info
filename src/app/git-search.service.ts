import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Repository, RepositoryItem, Issue, IssueItem } from "./app.interfaces";
import { Const } from "./app.constants";

const httpOptions = {
  headers: new HttpHeaders(Const.HEADERS.json)
};

@Injectable({ providedIn: "root" })
export class GitSearchService {
  constructor(private http: HttpClient) {}

  public getIssues(param: string): Observable<Issue> {
    if (!param.trim()) {
      return of(Const.DEFAULT_ISSUE_ITEM);
    }
    return this.http
      .get<Issue>(Const.API.getIssues, {
        params: { q: "repo:" + param, state: "open", per_page: "100" },
        headers: httpOptions.headers
      })
      .pipe(catchError(this.handleError));
  }

  public searchRepoData(param: string): Observable<Repository[]> {
    if (!param.trim()) {
      return of([]);
    }
    return this.http
      .get<Repository[]>(Const.API.getRepo, {
        params: { q: param },
        headers: httpOptions.headers
      })
      .pipe(
        map((res: Repository[]) =>
          this.limitResponse(res["items"], 0, Const.SEARCH_LIMIT)
        ),
        catchError(this.handleError)
      );
  }

  private limitResponse(
    data: RepositoryItem[],
    offset: number,
    limit: number
  ): any {
    let arr = [];
    data.slice(offset, limit).map(item => arr.push(item));
    return arr;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }
}
