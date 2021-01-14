/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

function documentReady(callback: () => void) {
  document.addEventListener('DOMContentLoaded', callback);
}

function createElement(tagName: string): HTMLElement {
  return document.createElement(tagName);
}

function wrapElement(element: HTMLElement, wrapper: HTMLElement) {
  element.parentNode.insertBefore(wrapper, element);
  wrapper.appendChild(element);
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

function getCssStyle(element: HTMLElement, styleName: string) {
  element.style.getPropertyValue(styleName);
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
  createElement,
  wrapElement,
  getParentElement,
  getElementDimension,
  getCssClass,
  applyCssClass,
  getCssStyle,
  applyCssStyle,
  disableContextMenu,
  disableDragging,
  getElements,
};
