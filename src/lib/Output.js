export default class Output {
  constructor(element) {
    this.element = element;
  }
  reset() {
    this.element.textContent = "";
  }
  loading(bool) {
    if (bool) {
      this.element.classList.add("loading");
    } else {
      this.element.classList.remove("loading");
    }
  }
  print(elements) {
    elements.forEach((element) => {
      if (typeof element === "string") {
        this.element.appendChild(document.createTextNode(element));
      } else {
        this.element.appendChild(element);
      }
    });
    this.element.appendChild(document.createElement("br"));
  }
}
