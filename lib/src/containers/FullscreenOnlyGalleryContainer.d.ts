/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { SlideshowConfig } from './SlideshowContainer';
import GalleryContainer from './GalleryContainer';
export type FullscreenOnlyGalleryConfig = SlideshowConfig;
export default class FullscreenOnlyGallery extends GalleryContainer {
    constructor(config: FullscreenOnlyGalleryConfig);
}
