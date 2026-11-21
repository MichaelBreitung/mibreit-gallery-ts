export type TElementDimension = { width: number; height: number };

export function getRootFontSize(): number {
  return parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'));
}

export function createElement(tagName: string): HTMLElement {
  return document.createElement(tagName);
}

export function cloneElement(element: Node): Node {
  return element.cloneNode();
}

export function removeElement(element: HTMLElement): void {
  element.remove();
}

export function prependChildElement(element: HTMLElement, parent: HTMLElement): void {
  parent.prepend(element);
}

export function appendChildElement(element: Node, parent: Node): void {
  parent.appendChild(element);
}

export function prependBeforeChild(element: HTMLElement, child: HTMLElement): void {
  child.parentElement?.insertBefore(element, child);
}

export function getChildNodes(element: HTMLElement): Array<Node> {
  return Array.from(element.childNodes);
}

export function setInnerHtml(parent: HTMLElement, inner: string): void {
  parent.innerHTML = inner;
}

export function wrapElements(elements: Array<Node>, wrapper: HTMLElement): void {
  const parent = elements[0]?.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, elements[0]);
    elements.forEach((element) => {
      wrapper.appendChild(element);
    });
  }
}

export function getElementDimension(element: HTMLElement): TElementDimension {
  const { width, height } = element.getBoundingClientRect();
  return { width, height };
}

export function getElementPosition(element: HTMLElement): { x: number; y: number } {
  const rect = element.getBoundingClientRect();
  return { x: rect.left + window.scrollX, y: rect.top + window.scrollY };
}

export function addCssClass(element: HTMLElement, cssClass: string): void {
  element.classList.add(cssClass);
}

export function removeCssClass(element: HTMLElement, cssClass: string): void {
  element.classList.remove(cssClass);
}

export function addCssStyle(element: HTMLElement, styleName: string, styleValue: string): void {
  element.style.setProperty(styleName, styleValue);
}

export function removeCssStyle(element: HTMLElement, styleName: string): void {
  element.style.removeProperty(styleName);
  if (element.style.length === 0) {
    element.removeAttribute('style');
  }
}

export function overwriteCssStyles(element: HTMLElement, styles: string | null): void {
  if (styles == null) {
    element.removeAttribute('style');
  } else {
    element.style.cssText = styles;
  }
}

export function addEventListener(element: HTMLElement, event: string, callback: (event: any) => void): void {
  element.addEventListener(event, callback);
}

export function addClickEventListener(element: HTMLElement, callback: (event?: MouseEvent) => void): void {
  element.addEventListener('click', callback);
}

export function addKeyEventListener(callback: (event: KeyboardEvent) => void): void {
  document.addEventListener('keydown', callback);
}

export function getKeyFromEvent(event: KeyboardEvent): string {
  return event.key;
}

export function disableContextMenu(element: HTMLElement): void {
  element.addEventListener('contextmenu', (event) => event.preventDefault());
}

export function disableDragging(element: HTMLElement): void {
  element.addEventListener('dragstart', (event) => event.preventDefault());
}

export function getElement(selector: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(selector);
}

export function getElements(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll<HTMLElement>(selector);
}
