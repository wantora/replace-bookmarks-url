import promiseThrottle from "./promiseThrottle";

function eachBookmarkTree(node, callback) {
  if (node.url) {
    callback(node);
  }
  if (node.children) {
    node.children.forEach((child) => {
      eachBookmarkTree(child, callback);
    });
  }
}

function getBookmarkNodes() {
  return browser.bookmarks.getTree().then((rootNodes) => {
    const nodes = [];
    
    rootNodes.forEach((rootNode) => {
      eachBookmarkTree(rootNode, (node) => {
        nodes.push(node);
      });
    });
    
    return nodes;
  });
}

export default promiseThrottle(getBookmarkNodes);
