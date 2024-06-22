/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { getElements } from 'mibreit-dom-tools';
import GalleryContainerBuilder from '../builders/GalleryBuilder';
// Types
import { checkSlideshowConfig } from '../types';
export default function (imageSelector, config) {
    if (typeof imageSelector !== 'string') {
        throw new Error('createFullscreenOnlyGallery - first parameter must be imageSelector string');
    }
    checkSlideshowConfig(config);
    const elements = getElements(imageSelector);
    if ((elements === null || elements === void 0 ? void 0 : elements.length) > 0) {
        return GalleryContainerBuilder.fromImages(elements, config).addPreviousNextButtons().addFullscreen().build();
    }
    else {
        throw new Error('createFullscreenOnlyGallery - no images selected');
    }
}
