/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssStyle, getElement, getElements } from 'mibreit-dom-tools';
import checkSlideshowConfig from '../tools/checkSlideshowConfig';
import GalleryContainerBuilder from '../builders/GalleryContainerBuilder';
import checkThumbScrollerConfig from '../tools/checkThumbScrollerConfig';
export default function (containerSelector, imageSelector, config) {
    if (typeof containerSelector !== 'string') {
        throw new Error('createGallery - first parameter must be containerSelector string');
    }
    if (typeof imageSelector !== 'string') {
        throw new Error('createGallery - second parameter must be imageSelector string');
    }
    if (config) {
        checkSlideshowConfig(config);
    }
    const elements = getElements(imageSelector);
    const container = getElement(containerSelector);
    if (container && (elements === null || elements === void 0 ? void 0 : elements.length) > 0) {
        const builder = new GalleryContainerBuilder(container, elements, config);
        if (typeof (config === null || config === void 0 ? void 0 : config.thumbSelector) === 'string' && typeof (config === null || config === void 0 ? void 0 : config.thumbContainerSelector) === 'string') {
            checkThumbScrollerConfig(config);
            const thumbContainer = getElement(config.thumbContainerSelector);
            const thumbs = getElements(config.thumbSelector);
            if (thumbContainer && thumbs) {
                if (thumbs.length > 1) {
                    builder.addThumbScroller(thumbContainer, thumbs, config);
                }
                else {
                    addCssStyle(thumbContainer, 'display', 'none');
                }
            }
        }
        return builder.build();
    }
    else {
        throw new Error('createGallery - no images selected');
    }
}
