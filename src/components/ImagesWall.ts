/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, createElement } from 'mibreit-dom-tools';
import styles from './ImagesWall.module.css';
import Image from './Image';

export default class ImagesWall {
  private _wall: HTMLElement;
  private _columnFillState: Array<number> = [];

  constructor(images: Array<Image>, columns: number = 3) {
    this._wall = this._createWall(images, columns);
  }

  get element(): HTMLElement {
    return this._wall;
  }

  private _createWall(images: Array<Image>, columns: number): HTMLElement {
    const wall = createElement('div');
    addCssClass(wall, styles.img_wall);

    const cols: HTMLElement[] = [];
    for (let i = 0; i < columns; i++) {
      const col = createElement('div');
      addCssClass(col, styles.img_col);
      wall.appendChild(col);
      cols.push(col);
    }

    images.forEach((image, index) => {
      let targetIndex = index % cols.length;
      if (index >= columns) {
        targetIndex = this._getShortestColumnIndex();
      }
      const targetCol = cols[targetIndex];

      this._updateColumnHeight(targetIndex, image.getHeight());

      const node = image.getHtmlElement();
      targetCol.appendChild(node as Node);

      image.addWasLoadedCallback(() => {
        this._waitForDecoded(node as HTMLImageElement);
      });

      if (image.wasLoaded()) {
        this._waitForDecoded(node as HTMLImageElement);
      }
    });

    return wall;
  }

  private _getShortestColumnIndex(): number {
    let shortestIndex = 0;
    let shortestHeight = this._columnFillState[0] || 0;

    for (let i = 1; i < this._columnFillState.length; i++) {
      const colHeight = this._columnFillState[i] || 0;
      if (colHeight < shortestHeight) {
        shortestHeight = colHeight;
        shortestIndex = i;
      }
    }

    return shortestIndex;
  }

  private _updateColumnHeight(index: number, addedHeight: number): void {
    if (!this._columnFillState[index]) {
      this._columnFillState[index] = 0;
    }
    this._columnFillState[index] += addedHeight;
  }

  private _waitForDecoded = async (image: HTMLImageElement) => {
    const callback = () => {
      addCssClass(image, styles.img_loaded);
    };

    try {
      if (typeof image.decode === 'function') {
        await image.decode();
      } else {
        // fallback: ensure the image actually has dimensions
        if (image.naturalWidth === 0) {
          await new Promise((r) => setTimeout(r, 50));
        }
      }
    } catch (e) {
      // decode() can reject for broken images; proceed anyway
    } finally {
      requestAnimationFrame(callback);
    }
  };
}
