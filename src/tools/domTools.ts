function documentReady(callback: () => void)
{
  document.addEventListener("DOMContentLoaded", callback);
}

function createElement(tagName: string): HTMLElement {
  return document.createElement(tagName);
}

function wrapElement(element: HTMLElement, wrapper: HTMLElement) {
  element.parentNode.insertBefore(wrapper, element);
  wrapper.appendChild(element);
}

function getParentElement(element: HTMLElement) : HTMLElement {
  return element.parentElement;
}

function getElementDimension(element: HTMLElement) : {width: number, height: number} {  
  return {
    width: element.clientWidth,
    height: element.clientHeight
  }
}

function applyCssClass(element: HTMLElement, cssClass: string)
{
  element.setAttribute("class", cssClass);
}

function applyCssStyle(element: HTMLElement, styleName: string, styleProperty: string)
{
  element.style.setProperty(styleName, styleProperty);
}

function disableContextMenu(element: HTMLElement) {
  element.addEventListener('contextmenu', e => {
    e.preventDefault();
  });
}

function disableDragging(element: HTMLElement) {
  element.addEventListener('dragstart', e => {
    e.preventDefault();
  });
}

function getElements(selector: string) : NodeListOf<HTMLElement>
{
  return document.querySelectorAll(selector);
}

export default {
  documentReady,
  createElement,
  wrapElement,
  getParentElement,
  getElementDimension,
  applyCssClass,
  applyCssStyle,
  disableContextMenu,
  disableDragging,
  getElements
}