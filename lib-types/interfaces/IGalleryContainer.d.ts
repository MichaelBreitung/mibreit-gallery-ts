/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IFullscreen from './IFullscreen';
import ISlideshowContainer from './ISlideshowContainer';
import IThumbsViewer from './IThumbsViewer';
export default interface IGalleryContainer extends ISlideshowContainer {
    getFullscreen(): IFullscreen | null;
    getThumbsViewer(): IThumbsViewer | null;
}
