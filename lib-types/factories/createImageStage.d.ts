/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IImageStage from '../interfaces/IImageStage';
export declare enum EImageScaleMode {
    NONE = 0,
    FIT_ASPECT = 1,
    STRETCH = 2,
    EXPAND = 3
}
export default function (imageHandle: HTMLElement, imageWidth: number, imageHeight: number, scaleMode?: EImageScaleMode): IImageStage;
