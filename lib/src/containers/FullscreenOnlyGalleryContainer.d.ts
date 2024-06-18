/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { SlideshowConfig } from './SlideshowContainer';
import GalleryContainer from './GalleryContainer';
import { ILazyLoader } from 'mibreit-lazy-loader';
export type FullscreenOnlyGalleryConfig = SlideshowConfig;
export default class FullscreenOnlyGallery extends GalleryContainer {
    constructor(originalImages: NodeListOf<HTMLElement>, config: FullscreenOnlyGalleryConfig, lazyLoader?: ILazyLoader);
    private static _createContainer;
}
