import openSingleTab from "./lib/openSingleTab";

browser.browserAction.onClicked.addListener(() => {
  openSingleTab(browser.extension.getURL("main.html"));
});
