/**
 * Builder for ImagesWall component
 */
import { addClickEventListener, addCssClass } from 'mibreit-dom-tools';
import { ELazyMode, createLazyLoaderFromElements } from 'mibreit-lazy-loader';

import ImagesWall from '../components/ImagesWall';
import Image from '../components/Image';

import styles from './ImagesWallBuilder.module.css';

export default class ImagesWallBuilder {
  private _containerElement: HTMLElement;
  private _images: Array<Image>;
  private _imagesWall: ImagesWall;

  constructor(
    containerElement: HTMLElement,
    imageElements: NodeListOf<HTMLElement>,
    columns?: number,
    imageClickedCallback?: (index: number) => void
  ) {
    this._containerElement = containerElement;
    addCssClass(this._containerElement, styles.images_wall__parent);

    this._images = this._createImagesArray(imageElements);
    this._imagesWall = new ImagesWall(this._images, columns);

    if (imageClickedCallback) {
      this._addImageClickCallbacks(imageClickedCallback);
    }

    createLazyLoaderFromElements(this._images, {
      mode: ELazyMode.WINDOWED_SCROLL,
      useSurrogate: true,
    });

    // Append the wall to the container
    this._containerElement.appendChild(this._imagesWall.element);
  }

  public addImageClickedCallback(cb: (index: number) => void): ImagesWallBuilder {
    this._addImageClickCallbacks(cb);
    return this;
  }

  public build(): ImagesWall {
    return this._imagesWall;
  }

  private _createImagesArray(imageElements: NodeListOf<HTMLElement>): Array<Image> {
    const images: Array<Image> = new Array();
    for (let i = 0; i < imageElements.length; i++) {
      const image: Image = new Image(imageElements[i]!);
      images.push(image);
    }
    return images;
  }

  private _addImageClickCallbacks(cb: (index: number) => void) {
    this._images.forEach((img, index) => {
      addClickEventListener(img.getHtmlElement(), () => {
        cb(index);
      });
    });
  }
}
