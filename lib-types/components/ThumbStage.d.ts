/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import ImageStageExpand from './ImageStageExpand';
export default class ThumbStage extends ImageStageExpand {
    constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number);
    addStageClickedCallback(callback: () => void): void;
}
