/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { getElement, getElements } from 'mibreit-dom-tools';
import ThumbScrollerContainer from '../containers/ThumbScrollerContainer';
import checkConfig from '../tools/checkThumbScrollerConfig';
export default function (containerSelector, thumbSelector, config, thumbClickedCallback) {
    if (typeof containerSelector !== 'string') {
        throw new Error('createThumbScroller - first parameter must be containerSelector string');
    }
    if (typeof thumbSelector !== 'string') {
        throw new Error('createThumbScroller - second parameter must be imageSelector string');
    }
    if (config) {
        checkConfig(config);
    }
    const elements = getElements(thumbSelector);
    const container = getElement(containerSelector);
    if (container && (elements === null || elements === void 0 ? void 0 : elements.length) > 0) {
        return new ThumbScrollerContainer(container, elements, config, thumbClickedCallback).getScroller();
    }
    else {
        throw new Error('createThumbScroller - no images selected');
    }
}
