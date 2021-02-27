/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';

// helpers
import { SlideshowConfig } from './SlideshowContainer';

// styles
import styles from './FullscreenOnlyGalleryContainer.module.css';
import GalleryContainer from './GalleryContainer';

export type FullscreenOnlyGalleryConfig = SlideshowConfig;

export default class FullscreenOnlyGallery extends GalleryContainer {  
  constructor(config: FullscreenOnlyGalleryConfig) {
    const originalImages = DomTools.getElements(config.imageSelector);
    const container = DomTools.createElement('div');
    DomTools.addCssClass(container, styles.mibreit_gallery_fullscreen_only_container);
    const body = DomTools.getElement('body');
    // @ts-ignore - there will always be a body, no nullcheck needed
    DomTools.appendChildElement(container, body);
    originalImages.forEach((image: HTMLElement) => {
      DomTools.appendChildElement(DomTools.cloneElement(image), container);
    });

    const adaptedConfig = {
      ...config,
      slideshowContainerSelector: `.${styles.mibreit_gallery_fullscreen_only_container}`,
    };
    adaptedConfig.imageSelector = `.${styles.mibreit_gallery_fullscreen_only_container} > img`;
    super(adaptedConfig);
        
    const fullscreen = this.getFullscreen();
    const viewer = this.getViewer();
    if (fullscreen && viewer) {
      fullscreen.addFullscreenChangedCallback((active: boolean) => {
        if (active) {
          DomTools.addCssStyle(container, 'display', 'unset');
          viewer.reinitSize();
        } else {
          DomTools.addCssStyle(container, 'display', 'none');
        }
      });
    }
  }  
}
