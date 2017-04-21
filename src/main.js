import ReplaceData from "./lib/ReplaceData";
import Output from "./lib/Output";
import throttle from "./lib/throttle";
import getBookmarkNodes from "./lib/getBookmarkNodes";

const output = new Output(document.getElementById("output"));

let currentPreviewID = 0;
function preview() {
  let replaceData;
  try {
    replaceData = new ReplaceData(patternElement.value, replacementElement.value);
  } catch (error) {
    output.reset();
    return;
  }
  
  currentPreviewID += 1;
  const previewID = currentPreviewID;
  
  output.loading(true);
  
  getBookmarkNodes().then((nodes) => {
    if (previewID !== currentPreviewID) {
      return;
    }
    output.loading(false);
    output.reset();
    
    const targetNodes = nodes.filter((node) => replaceData.test(node));
    output.print([`${targetNodes.length} items.`]);
    
    targetNodes.forEach((node) => {
      output.print(replaceData.getDiff(node));
    });
  });
}
const throttledPreview = throttle(preview, 500);

function update() {
  // eslint-disable-next-line no-alert
  if (!window.confirm("OK?")) {
    return;
  }
  
  output.reset();
  
  let replaceData;
  try {
    replaceData = new ReplaceData(patternElement.value, replacementElement.value);
  } catch (error) {
    return;
  }
  
  getBookmarkNodes().then((nodes) => {
    const targetNodes = nodes.filter((node) => replaceData.test(node));
    output.print([`${targetNodes.length} items.`]);
    
    const ps = targetNodes.map((node) => {
      return replaceData.update(node).then((newNode) => {
        output.print([`${node.url} -> ${newNode.url}`]);
      });
    });
    return Promise.all(ps);
  }).then(() => {
    output.print(["complete."]);
  });
}

const patternElement = document.getElementById("pattern");
const replacementElement = document.getElementById("replacement");
const replaceButton = document.getElementById("replaceButton");

patternElement.addEventListener("input", throttledPreview, false);
replacementElement.addEventListener("input", throttledPreview, false);
replaceButton.addEventListener("click", update, false);

preview();
