/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { ThumbScrollerConfig } from '../types';
import IThumbsViewer from '../interfaces/IThumbsViewer';
export default function (containerSelector: string, thumbSelector: string, config?: ThumbScrollerConfig, thumbClickedCallback?: (index: number) => void): IThumbsViewer;
