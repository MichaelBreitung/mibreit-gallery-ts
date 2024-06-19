/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { getElements } from 'mibreit-dom-tools';
import SlideshowContainer from '../containers/SlideshowContainer';
import checkSlideshowConfig from '../tools/checkSlideshowConfig';
export default function (imageSelector, config) {
    if (typeof imageSelector !== 'string') {
        throw new Error('createSlideshow - second parameter must be imageSelector string');
    }
    const elements = getElements(imageSelector);
    if ((elements === null || elements === void 0 ? void 0 : elements.length) > 0) {
        if (config) {
            checkSlideshowConfig(config);
        }
        return new SlideshowContainer(elements, config);
    }
    else {
        throw new Error('createSlideshow - no images selected');
    }
}
