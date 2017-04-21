export default class ReplaceData {
  constructor(patternSource, replacement) {
    if (patternSource === "") {
      throw new Error("empty patternSource");
    }
    
    this.pattern = new RegExp(patternSource);
    this.replacement = replacement;
    this.getTreePromise = null;
  }
  test(node) {
    return this.pattern.test(node.url);
  }
  getNewURL(node) {
    return node.url.replace(this.pattern, this.replacement);
  }
  getDiff(node) {
    const m = this.pattern.exec(node.url);
    const leftContext1 = RegExp.leftContext;
    const rightContext1 = RegExp.rightContext;
    
    const del = document.createElement("del");
    del.textContent = m[0];
    
    const newURL = this.getNewURL(node);
    const leftContext2 = RegExp.leftContext;
    const rightContext2 = RegExp.rightContext;
    
    const ins = document.createElement("ins");
    ins.textContent = newURL.slice(leftContext2.length, newURL.length - rightContext2.length);
    
    return [
      leftContext1,
      del,
      rightContext1,
      " -> ",
      leftContext2,
      ins,
      rightContext2,
    ];
  }
  update(node) {
    return browser.bookmarks.update(node.id, {
      url: this.getNewURL(node),
    });
  }
}
