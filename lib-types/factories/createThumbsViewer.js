/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { getElement, getElements } from 'mibreit-dom-tools';
import ThumbScrollerContainer from '../containers/ThumbScrollerContainer';
// Types
import { checkThumbScrollerConfig } from '../types';
export default function (containerSelector, thumbSelector, config, thumbClickedCallback) {
    if (typeof containerSelector !== 'string') {
        throw new Error('createThumbsViewer - first parameter must be containerSelector string');
    }
    if (typeof thumbSelector !== 'string') {
        throw new Error('createThumbsViewer - second parameter must be imageSelector string');
    }
    if (config) {
        checkThumbScrollerConfig(config);
    }
    const elements = getElements(thumbSelector);
    const container = getElement(containerSelector);
    if (container && (elements === null || elements === void 0 ? void 0 : elements.length) > 0) {
        return new ThumbScrollerContainer(container, elements, config, thumbClickedCallback).getThumbsViewer();
    }
    else {
        throw new Error('createThumbsViewer - no images selected');
    }
}
