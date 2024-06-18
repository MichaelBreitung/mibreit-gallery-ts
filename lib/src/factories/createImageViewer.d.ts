/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import Image from '../components/Image';
import IImageViewer from '../interfaces/IImageViewer';
import { EImageScaleMode } from './createImageStage';
export default function (images: Array<Image>, scaleMode?: EImageScaleMode): IImageViewer;
