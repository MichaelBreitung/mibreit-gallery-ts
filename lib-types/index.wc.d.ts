/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import './index.css';
import IGallery from './interfaces/IGallery';
export * from './index';
declare global {
    interface Window {
        mbgGalleryObjects: Array<IGallery>;
    }
}
