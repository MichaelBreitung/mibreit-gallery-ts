/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IImageViewer from '../interfaces/IImageViewer';
import IImageInfo from '../interfaces/IImageInfo';
import Image from './Image';
import { EImageScaleMode } from '../factories/createImageStage';
import { ESwipeDirection } from './SwipeHandler';
export default class ImageViewer implements IImageViewer {
    private _currentIndex;
    private _imageStages;
    private _images;
    private _imageChangedCallbacks;
    constructor(images: Array<Image>, scaleMode?: EImageScaleMode);
    showImage(index: number): boolean;
    showNextImage(swipeDirection?: ESwipeDirection): boolean;
    showPreviousImage(swipeDirection?: ESwipeDirection): boolean;
    getNumberOfImages(): number;
    reinitSize(): void;
    setZoomAnimation(active: boolean): void;
    addImageChangedCallback(callback: (index: number, imageInfo: IImageInfo) => void): void;
    getImageIndex(): number;
    getImageInfo(index: number): IImageInfo | null;
    private _showImage;
    private _prepareImageStages;
    private _isValidIndex;
    private _changeCurrentImage;
}
