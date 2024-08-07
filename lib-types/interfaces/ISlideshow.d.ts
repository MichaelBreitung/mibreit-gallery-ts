/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { ILazyLoader } from 'mibreit-lazy-loader';
import IImageViewer from './IImageViewer';
export default interface ISlideshow {
    getImageViewer(): IImageViewer;
    getLoader(): ILazyLoader;
}
