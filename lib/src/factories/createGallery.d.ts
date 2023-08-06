/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IGalleryContainer from '../interfaces/IGalleryContainer';
import { SlideshowConfig } from '../containers/SlideshowContainer';
import { ThumbScrollerConfig } from '../containers/ThumbScrollerContainer';
export type GalleryConfig = SlideshowConfig & ThumbScrollerConfig & {
    thumbContainerSelector?: string;
    thumbSelector?: string;
};
export default function (containerSelector: string, imageSelector: string, config: GalleryConfig): IGalleryContainer;
