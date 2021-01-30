/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import Image from '../components/Image';
import ImageViewer from '../components/ImageViewer';
import IImageViewer from '../interfaces/IImageViewer';
import { EImageScaleMode } from './createImageStage';

export default function(images: Array<Image>, scaleMode: EImageScaleMode = EImageScaleMode.FIT_ASPECT): IImageViewer {
  const imageViewer: ImageViewer = new ImageViewer(images, scaleMode);
  return imageViewer;
}
