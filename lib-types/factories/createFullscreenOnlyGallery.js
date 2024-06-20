/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssStyle, appendChildElement, cloneElement, createElement, getElement, getElements, removeCssStyle, } from 'mibreit-dom-tools';
import checkSlideshowConfig from '../tools/checkSlideshowConfig';
import GalleryContainerBuilder from '../builders/GalleryContainerBuilder';
function createImagesContainer() {
    const container = createElement('div');
    addCssStyle(container, 'display', 'none');
    const body = getElement('body');
    appendChildElement(container, body);
    return container;
}
export default function (imageSelector, config) {
    if (typeof imageSelector !== 'string') {
        throw new Error('createFullscreenOnlyGallery - first parameter must be imageSelector string');
    }
    checkSlideshowConfig(config);
    const elements = getElements(imageSelector);
    if ((elements === null || elements === void 0 ? void 0 : elements.length) > 0) {
        const container = createImagesContainer();
        elements.forEach((image) => {
            appendChildElement(cloneElement(image), container);
        });
        const clonedElements = container.children;
        const builder = new GalleryContainerBuilder(container, clonedElements, config);
        builder.addFullscreen();
        const galleryContainer = builder.build();
        const fullscreen = galleryContainer.getFullscreenContainer();
        if (fullscreen) {
            fullscreen.addFullscreenChangedCallback((active) => {
                if (active) {
                    removeCssStyle(container, 'display');
                }
                else {
                    addCssStyle(container, 'display', 'none');
                }
            });
        }
        return galleryContainer;
    }
    else {
        throw new Error('createFullscreenOnlyGallery - no images selected');
    }
}
