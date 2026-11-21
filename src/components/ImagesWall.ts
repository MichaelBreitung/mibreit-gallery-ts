/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, createElement, wrapElements } from '../tools/DomWrappers';
import styles from './ImagesWall.module.css';
import commonStyles from '../common.module.css';
import Image from './Image';
import { IMAGES_WALL_DEFAULTS, checkImagesWallConfig } from '../types';

type WallItem = { wrapper: HTMLElement; node: HTMLElement; weight: number };

export default class ImagesWall {
  private _wall: HTMLElement;
  private _items: Array<WallItem>;
  private _columnFillState: Array<number> = [];
  private _columns: number;
  private _requestedColumns: number;
  private _columnsUpdateDelay: number;
  private _updateTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    images: Array<Image>,
    columns: number = IMAGES_WALL_DEFAULTS.columns,
    columnsUpdateDelay: number = IMAGES_WALL_DEFAULTS.columnsUpdateDelay
  ) {
    this._columns = columns;
    this._requestedColumns = columns;
    this._columnsUpdateDelay = columnsUpdateDelay;
    this._items = images.map((image) => this._createItem(image));
    this._wall = createElement('div');
    addCssClass(this._wall, styles.img_wall);
    this._wall.replaceChildren(...this._distributeIntoColumns(columns));
  }

  get element(): HTMLElement {
    return this._wall;
  }

  /**
   * Re-distributes the existing image wrappers (including lazy loader surrogates) into a new number of columns.
   * Calls are debounced: only the last requested value is applied once no further call arrived for the configured delay.
   */
  public updateNrColumns(columns: number): void {
    checkImagesWallConfig({ columns });
    this._requestedColumns = columns;
    if (this._updateTimer !== null) {
      clearTimeout(this._updateTimer);
      this._updateTimer = null;
    }
    if (this._columnsUpdateDelay === 0) {
      this._applyRequestedColumns();
      return;
    }
    this._updateTimer = setTimeout(() => this._applyRequestedColumns(), this._columnsUpdateDelay);
  }

  private _applyRequestedColumns(): void {
    this._updateTimer = null;
    if (this._requestedColumns === this._columns) {
      return;
    }
    this._columns = this._requestedColumns;
    this._markLoadedImagesAsSettled();
    this._wall.replaceChildren(...this._distributeIntoColumns(this._columns));
  }

  private _createItem(image: Image): WallItem {
    const node = image.getHtmlElement();
    const wrapper = createElement('div');
    addCssClass(wrapper, styles.img_wrapper);
    wrapElements([node], wrapper);
    addCssClass(node, commonStyles.image_transition);

    image.addWasLoadedCallback(() => {
      addCssClass(wrapper, styles.img_loaded);
      this._waitForDecoded(node as HTMLImageElement);
    });

    if (image.wasLoaded()) {
      this._waitForDecoded(node as HTMLImageElement);
    }

    return { wrapper, node, weight: image.getHeight() / image.getWidth() };
  }

  private _distributeIntoColumns(columns: number): HTMLElement[] {
    this._columnFillState = new Array(columns).fill(0);

    const cols: HTMLElement[] = [];
    for (let i = 0; i < columns; i++) {
      const col = createElement('div');
      addCssClass(col, styles.img_col);
      cols.push(col);
    }

    this._items.forEach((item) => {
      const targetIndex = this._getShortestColumnIndex();
      cols[targetIndex]!.appendChild(item.wrapper);
      this._columnFillState[targetIndex]! += item.weight;
    });

    return cols;
  }

  // Moving a node restarts its CSS animation, so images that were already revealed must not replay it.
  private _markLoadedImagesAsSettled(): void {
    this._items.forEach(({ wrapper, node }) => {
      if (node.classList.contains(styles.img_loaded!)) {
        addCssClass(wrapper, styles.img_settled!);
      }
    });
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
