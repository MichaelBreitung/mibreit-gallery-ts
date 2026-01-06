/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IGallery from '../interfaces/IGallery';
import { SlideshowConfig } from '../types';
export default function (imageSelector: string, config: SlideshowConfig, showDescriptions?: boolean, buyImageCb?: ((idx: number) => void) | null): IGallery;
