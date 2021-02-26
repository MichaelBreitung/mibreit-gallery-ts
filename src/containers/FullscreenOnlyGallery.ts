/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';

// interfaces
import IGallery from '../interfaces/IGalleryContainer';
import IFullscreen from '../interfaces/IFullscreen';

// factories
import createGallery from '../factories/createGallery';

// helpers
import { SlideshowConfig } from './SlideshowContainer';

// styles
import styles from './FullscreenOnlyGallery.module.css';

export type FullscreenOnlyGalleryConfig = SlideshowConfig;

export default class FullscreenOnlyGallery implements IFullscreen {
  private _container: HTMLElement;
  private _gallery: IGallery;

  constructor(config: FullscreenOnlyGalleryConfig) {
    const originalImages = DomTools.getElements(config.imageSelector);
    this._container = DomTools.createElement('div');
    DomTools.addCssClass(this._container, styles.mibreit_gallery_fullscreen_only_container);
    const body = DomTools.getElement('body');
    // @ts-ignore - there will always be a body, no nullcheck needed
    DomTools.appendChildElement(this._container, body);
    originalImages.forEach((image: HTMLElement) => {
      DomTools.appendChildElement(DomTools.cloneElement(image), this._container);
    });

    const adaptedConfig = {
      ...config,
      slideshowContainerSelector: `.${styles.mibreit_gallery_fullscreen_only_container}`,
    };
    adaptedConfig.imageSelector = `.${styles.mibreit_gallery_fullscreen_only_container} > img`;

    this._gallery = createGallery(adaptedConfig);
    const fullscreen = this._gallery.getFullscreen();
    const viewer = this._gallery.getViewer();
    if (fullscreen && viewer) {
      fullscreen.addFullscreenChangedCallback((active: boolean) => {
        if (active) {
          DomTools.addCssStyle(this._container, 'display', 'unset');
          viewer.reinitSize();
        } else {
          DomTools.addCssStyle(this._container, 'display', 'none');
        }
      });
    }
  }

  activate(): void {    
    this._gallery.getFullscreen()?.activate();
  }

  deActivate(): void {
    this._gallery.getFullscreen()?.deActivate();
  }

  addFullscreenChangedCallback(callback: (active: boolean) => void): void {
    this._gallery.getFullscreen()?.addFullscreenChangedCallback(callback);
  }

  isFullscreenActive(): boolean {
    const isActive = this._gallery.getFullscreen()?.isFullscreenActive();
    return isActive ? isActive : false;
  }
}
