/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import Image from './Image';
export default class ImagesWall {
    private _wall;
    private _columnFillState;
    constructor(images: Array<Image>, columns?: number);
    get element(): HTMLElement;
    private _createWall;
    private _getShortestColumnIndex;
    private _updateColumnHeight;
    private _waitForDecoded;
}
