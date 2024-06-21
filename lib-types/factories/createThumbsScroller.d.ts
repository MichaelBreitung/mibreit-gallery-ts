/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IThumbsViewer from '../interfaces/IThumbsViewer';
import { ThumbScrollerConfig } from '../types';
export default function (containerSelector: string, thumbSelector: string, config?: ThumbScrollerConfig, thumbClickedCallback?: (index: number) => void): IThumbsViewer | null;
