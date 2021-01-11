import { IMAGE_DATA_SRC_ATTRIBUTE, IMAGE_SRC_ATTRIBUTE, IMAGE_TITLE_ATTRIBUTE, IMAGE_DATA_TITLE_ATTRIBUTE } from "../constants";
import DomTools from "../tools/domTools";
import IImageLoader from "../interfaces/ImageLoader"

export enum EImageState {
  INACTIVE,
  LOADING,
  LOADED,
}

export default class Image implements IImageLoader {
  private imageHandle: HTMLElement;
  private state: EImageState = EImageState.INACTIVE;
  private title: string;
  private width: number;
  private height: number;

  constructor(imageHandle: HTMLElement) {
    this.imageHandle = imageHandle;
    this.state = !imageHandle.hasAttribute(IMAGE_DATA_SRC_ATTRIBUTE) ? EImageState.LOADED : EImageState.INACTIVE;

    if (imageHandle.hasAttribute(IMAGE_TITLE_ATTRIBUTE)) {
      this.removeTitle(imageHandle);
    }

    this.title = imageHandle.getAttribute(IMAGE_DATA_TITLE_ATTRIBUTE);
    this.width = parseInt(imageHandle.getAttribute("width"));
    this.height = parseInt(imageHandle.getAttribute("height"));
    this.limitMaxSizeTo(this.width, this.height);
    DomTools.disableContextMenu(this.imageHandle);
    DomTools.disableDragging(this.imageHandle);
  }

  load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.state === EImageState.INACTIVE) {
        this.imageHandle.onload = () => {
          this.imageHandle.removeAttribute(IMAGE_DATA_SRC_ATTRIBUTE);
          this.state = EImageState.LOADED;
          resolve(true);
        };
        this.state = EImageState.LOADING;
        const dataSrc = this.imageHandle.getAttribute(IMAGE_DATA_SRC_ATTRIBUTE)
        this.imageHandle.setAttribute(IMAGE_SRC_ATTRIBUTE, dataSrc);
      }
      else if (this.state === EImageState.LOADING) {
        reject(false);
      }
      else {
        resolve(true);
      }
    });
  }

  wasLoaded(): boolean {
    return this.state === EImageState.LOADED;
  }

  getElement(): HTMLElement {
    return this.imageHandle;
  }

  getTitle(): string {
    return this.title;
  }

  getUrl() {
    return this.imageHandle.hasAttribute("data-src")
      ? this.imageHandle.getAttribute("data-src")
      : this.imageHandle.getAttribute("src");
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  private limitMaxSizeTo(maxWidth: number, maxHeight: number): void {
    DomTools.applyCssStyle(this.imageHandle, "max-width", `${maxWidth}px`);
    DomTools.applyCssStyle(this.imageHandle, "max-height", `${maxHeight}px`);
  }

  private removeTitle(imageHandle: HTMLElement) {
    imageHandle.setAttribute(IMAGE_DATA_TITLE_ATTRIBUTE, imageHandle.getAttribute(IMAGE_TITLE_ATTRIBUTE));
    imageHandle.removeAttribute(IMAGE_TITLE_ATTRIBUTE);
  }
}