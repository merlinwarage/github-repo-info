import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { GitSearchService } from "./git-search.service";
import { Const } from "./app.constants";
import { Repository, Issue } from "./app.interfaces";

describe("GithubApiService", () => {
  let injector: TestBed;
  let service: GitSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GitSearchService]
    });
    injector = getTestBed();
    service = injector.get(GitSearchService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe("#searchRepoData", () => {
    it("should return an Observable<Repository[]>", () => {
      const mockData = this.Repository;
      const method = 'GET';

      service.searchRepoData('angular').subscribe(data => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne(request => request.url === Const.API.getRepo);
      expect(req.request.method).toBe('GET');
    });
  });

  describe('#searchRepoData error', () => {
    it('should throw an error if trying to search for not supported query', () => {
      service.searchRepoData('')
        .subscribe(() => {}, err => {
          expect(err).toBe(`Searching for unknown is not supported.`);
        });
  
      httpMock.expectNone(`${Const.API.getRepo}?q=angular`);
    });
  });

  describe("#getIssues", () => {
    it("should return an Observable<Issue>", () => {
      const mockData = this.Issue;
      const method = 'GET';

      service.getIssues('angular/angular').subscribe(data => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne(request => request.url === Const.API.getIssues);
      expect(req.request.method).toBe(method);
    });
  });

  describe('#getIssues error', () => {
    it('should throw an error if trying to search for not supported query', () => {
      service.getIssues('')
        .subscribe(() => {}, err => {
          expect(err).toBe(`Searching for unknown is not supported.`);
        });
  
      httpMock.expectNone(`${Const.API.getIssues}?q=repo:angular/angular&state=open&per_page=100`);
    });
  });

  
});
