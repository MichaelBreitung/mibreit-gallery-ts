/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

function documentReady(callback: () => void) {
  document.addEventListener('DOMContentLoaded', callback);
}

function getRootFontSize(): number {
  return parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'));
}

function createElement(tagName: string): HTMLElement {
  return document.createElement(tagName);
}

function prependChildElement(element: HTMLElement, parent: HTMLElement) {
  parent.prepend(element);
}

function appendChildElement(element: HTMLElement, parent: HTMLElement) {
  parent.append(element);
}

function getChildNodes(element: HTMLElement): Array<Node> {
  const nodes: NodeList = element.childNodes;
  const nodesArray: Array<Node> = new Array();
  for (let i = 0; i < nodes.length; ++i) {
    nodesArray.push(nodes[i]);
  }
  return nodesArray;
}

function setInnerHtml(parent: HTMLElement, inner: string) {
  parent.innerHTML = inner;
}

function wrapElements(elements: Array<Node>, wrapper: HTMLElement) {
  elements[0].parentNode.insertBefore(wrapper, elements[0]);
  elements.forEach((element: HTMLElement) => {
    wrapper.appendChild(element);
  });
}

function getParentElement(element: HTMLElement): HTMLElement {
  return element.parentElement;
}

function getElementDimension(element: HTMLElement): { width: number; height: number } {
  return {
    width: element.clientWidth,
    height: element.clientHeight,
  };
}

function getElementPosition(element: HTMLElement): { x: number; y: number } {
  const rect = element.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { y: rect.top + scrollTop, x: rect.left + scrollLeft };
}

function getCssClass(element: HTMLElement): string {
  return element.getAttribute('class');
}

function applyCssClass(element: HTMLElement, cssClass: string | null) {
  if (cssClass !== null) {
    element.setAttribute('class', cssClass);
  } else {
    element.removeAttribute('class');
  }
}

function getCssStyle(element: HTMLElement, styleName: string): string {
  return element.style.getPropertyValue(styleName);
}

function applyCssStyle(element: HTMLElement, styleName: string, styleProperty: string | null) {
  if (styleProperty !== null) {
    element.style.setProperty(styleName, styleProperty);
  } else {
    element.style.removeProperty(styleName);
    if (element.style.length === 0) {
      element.removeAttribute('style');
    }
  }
}

function addClickEventListener(element: HTMLElement, callback: (event?: MouseEvent) => void) {
  element.addEventListener('click', callback);
}

function addEventListener(element: HTMLElement, event: string, callback: () => void) {
  element.addEventListener(event, callback);
}

function disableContextMenu(element: HTMLElement) {
  element.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}

function disableDragging(element: HTMLElement) {
  element.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });
}

function getElement(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

function getElements(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(selector);
}

export default {
  documentReady,
  getRootFontSize,
  createElement,
  prependChildElement,
  appendChildElement,
  getChildNodes,
  setInnerHtml,
  wrapElements,
  getParentElement,
  getElementDimension,
  getElementPosition,
  getCssClass,
  applyCssClass,
  getCssStyle,
  applyCssStyle,
  addClickEventListener,
  addEventListener,
  disableContextMenu,
  disableDragging,
  getElement,
  getElements,
};
