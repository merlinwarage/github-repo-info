import { browser, by, element, ExpectedConditions } from "protractor";

export class AppPage {
  navigateTo() {
    return browser.get("/");
  }

  getParagraphText() {
    return element(by.css("app-root .logo-text")).getText();
  }

  useSearchInput() {
    const until = ExpectedConditions;
    element(by.css("app-root .e2e-search-box")).sendKeys("angular");
    browser.waitForAngular();

    const elem = element(by.css("app-root .e2e-info-container"));
    browser.wait(
      until.presenceOf(elem),
      5000,
      "Element taking too long to appear in the DOM"
    );
    const itemName = element(by.css("app-root .e2e-result-list-item-name")).getText();
    element(by.css("app-root .e2e-result-list-item")).click();
    return itemName;
  }

  checkInfoPanel() {
    const until = ExpectedConditions;
    const elem = element(by.css("app-root .info-title"));
    browser.wait(
      until.presenceOf(elem),
      5000,
      "Element taking too long to appear in the DOM"
    );
    return element(by.css("app-root .info-title")).getText();
  }

  checkIssuePanel() {
    const until = ExpectedConditions;
    element(by.css("app-root .e2e-issues-link")).click();
    const elem = element(by.css("app-root .e2e-issue-panel-title"));
    browser.wait(
      until.presenceOf(elem),
      5000,
      "Element taking too long to appear in the DOM"
    );
    return element(by.css("app-root .e2e-issue-panel-title")).getText();   
  }
}
