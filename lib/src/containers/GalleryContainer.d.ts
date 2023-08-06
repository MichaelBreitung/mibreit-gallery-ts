/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IGalleryContainer from '../interfaces/IGalleryContainer';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbScroller from '../interfaces/IThumbScroller';
import IFullscreen from '../interfaces/IFullscreen';
export default class GalleryContainer implements IGalleryContainer {
    private _viewer;
    private _fullscreenContainer;
    private _thumbScroller;
    constructor(viewer: IImageViewer, thumbScroller: IThumbScroller | null, fullscreenContainer: IFullscreen | null);
    getViewer(): IImageViewer;
    getScroller(): IThumbScroller | null;
    getFullscreen(): IFullscreen | null;
}
