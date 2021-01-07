function createElement(tagName: string): HTMLElement {
  return document.createElement(tagName);
}

function wrapElement(element: HTMLElement, wrapper: HTMLElement) {
  element.parentNode.insertBefore(wrapper, element);
  wrapper.appendChild(element);
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

export default {
  createElement,
  wrapElement,
  disableContextMenu,
  disableDragging
}