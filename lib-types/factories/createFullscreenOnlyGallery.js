/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssClass, addCssStyle, appendChildElement, cloneElement, createElement, getElement, getElements, removeCssStyle, } from 'mibreit-dom-tools';
import checkSlideshowConfig from '../tools/checkSlideshowConfig';
import GalleryContainerBuilder from '../builders/GalleryContainerBuilder';
const IMAGES_CONTAINER_CLASS = 'mibreit_gallery_fullscreen_only_container';
function createImagesContainer() {
    const container = createElement('div');
    addCssStyle(container, 'display', 'none');
    addCssClass(container, IMAGES_CONTAINER_CLASS);
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
        const clonedElements = getElements(`.${IMAGES_CONTAINER_CLASS} > img`);
        const builder = new GalleryContainerBuilder(container, clonedElements, config);
        const galleryContainer = builder.build();
        const fullscreen = galleryContainer.getFullscreen();
        const viewer = galleryContainer.getViewer();
        if (fullscreen && viewer) {
            fullscreen.addFullscreenChangedCallback((active) => {
                if (active) {
                    removeCssStyle(container, 'display');
                    viewer.reinitSize();
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
