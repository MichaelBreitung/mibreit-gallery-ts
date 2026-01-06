/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IGallery from '../interfaces/IGallery';
import { GalleryConfig } from '../types';
export default function (containerSelector: string, imageSelector: string, config?: GalleryConfig, buyImageCb?: ((idx: number) => void) | null): IGallery;
