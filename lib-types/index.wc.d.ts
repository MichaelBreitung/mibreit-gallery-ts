/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import './index.css';
import { createGallery, createThumbsScroller, createFullscreenOnlyGallery, createSlideshow, EImageScaleMode } from './index';
import IGallery from './interfaces/IGallery';
export { createGallery, createFullscreenOnlyGallery, createThumbsScroller, createSlideshow, EImageScaleMode };
declare global {
    interface Window {
        mbgGalleryObjects: Array<IGallery>;
    }
}
