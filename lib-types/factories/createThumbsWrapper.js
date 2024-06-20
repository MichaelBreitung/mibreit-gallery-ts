/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import ThumbStage from '../components/ThumbStage';
import ThumbsWrapper from '../components/ThumbsWrapper';
import { NUMBER_OF_VISIBLE_THUMBS } from '../constants';
function prepareThumbStages(thumbs, thumbClickedCallback) {
    const thumbStages = new Array();
    thumbs.forEach((thumb, index) => {
        const thumbStage = new ThumbStage(thumb.getHtmlElement(), thumb.getWidth(), thumb.getHeight());
        thumbStage.showImage();
        if (thumbClickedCallback) {
            thumbStage.addStageClickedCallback(() => {
                thumbClickedCallback(index);
            });
        }
        thumbStages.push(thumbStage);
    });
    return thumbStages;
}
export default function (container, thumbs, numberOfVisibleThumbs = NUMBER_OF_VISIBLE_THUMBS, thumbClickedCallback) {
    prepareThumbStages(thumbs, thumbClickedCallback);
    return new ThumbsWrapper(container, numberOfVisibleThumbs);
}
