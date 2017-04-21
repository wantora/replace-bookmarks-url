export default function openSingleTab(url) {
  return browser.windows.getCurrent({populate: true}).then((win) => {
    for (const tab of win.tabs) {
      const tabURL = new URL(tab.url);
      tabURL.search = "";
      tabURL.hash = "";
      if (tabURL.href === url) {
        return tab;
      }
    }
    return null;
  }).then((tab) => {
    if (tab) {
      browser.tabs.update(tab.id, {active: true});
    } else {
      browser.tabs.create({url: url, active: true});
    }
  });
}
