import { AppPage } from "./app.po";

describe("Repository search app", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display the logo text", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("Repository Info");
  });

  it("should type in the autocomplete input, click on the first item and display the result", () => {
    page.navigateTo();
    expect(page.useSearchInput()).toBeTruthy();
    expect(page.checkInfoPanel()).toEqual("Name:");
  });

  it("should click on the `issues` link and get the first item`s title", () => {
    page.navigateTo();
    page.useSearchInput();
    page.checkInfoPanel();
    expect(page.checkIssuePanel()).toBeTruthy();
  });
});
