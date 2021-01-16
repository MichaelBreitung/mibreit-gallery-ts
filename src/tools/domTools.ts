/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

function documentReady(callback: () => void) {
  document.addEventListener('DOMContentLoaded', callback);
}

function getRootFontSize() : number {
  return parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'));
}

function createElement(tagName: string): HTMLElement {
  return document.createElement(tagName);
}

function prependChildElement(element: HTMLElement, parent: HTMLElement) {
  parent.prepend(element);
}

function appendChildElement(element: HTMLElement, parent: HTMLElement) {
  parent.appendChild(element);
}

function setInnerHtml(inner: string, parent: HTMLElement) {
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

function getCssStyle(element: HTMLElement, styleName: string) : string {
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

function addClickEventListener(element: HTMLElement, callback: () => void) {
  element.addEventListener('click', callback);
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

function getElements(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(selector);
}

export default {
  documentReady,
  getRootFontSize,
  createElement,
  prependChildElement,
  appendChildElement,
  setInnerHtml,
  wrapElements,
  getParentElement,
  getElementDimension,
  getCssClass,
  applyCssClass,
  getCssStyle,
  applyCssStyle,
  addClickEventListener,
  disableContextMenu,
  disableDragging,
  getElements,
};
