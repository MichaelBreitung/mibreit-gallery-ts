/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import Image from './Image';
import IImageViewer from '../interfaces/IImageViewer';
import IImageInfo from '../interfaces/IImageInfo';
import { ESwipeDirection } from './SwipeHandler';
import { EImageScaleMode } from '../types';
export default class ImageViewer implements IImageViewer {
    private _currentIndex;
    private _delayedNewIndex;
    private _imageStages;
    private _images;
    private _imageChangedCallbacks;
    constructor(images: Array<Image>, scaleMode?: EImageScaleMode);
    showImage(index: number): boolean;
    showNextImage(swipeDirection?: ESwipeDirection): boolean;
    showPreviousImage(swipeDirection?: ESwipeDirection): boolean;
    getNumberOfImages(): number;
    setZoomAnimation(active: boolean): void;
    addImageChangedCallback(callback: (index: number, imageInfo: IImageInfo) => void): void;
    getImageIndex(): number;
    getImageInfo(index: number): IImageInfo | null;
    getImageElement(index: number): HTMLElement | null;
    private _showImage;
    private _hideImage;
    private _prepareImageStages;
    private _isValidIndex;
    private _changeCurrentImage;
}
