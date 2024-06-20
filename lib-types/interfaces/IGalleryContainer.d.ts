/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IFullscreenContainer from './IFullscreenContainer';
import ISlideshowContainer from './ISlideshowContainer';
import IThumbsViewer from './IThumbsViewer';
export default interface IGalleryContainer extends ISlideshowContainer {
    getFullscreenContainer(): IFullscreenContainer | null;
    getThumbsViewer(): IThumbsViewer | null;
}
