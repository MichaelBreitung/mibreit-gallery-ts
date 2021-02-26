/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { ThumbScrollerConfig } from '../containers/ThumbScrollerContainer';
import IThumbScroller from '../interfaces/IThumbScroller';
export default function (config: ThumbScrollerConfig, thumbClickedCallback?: (index: number) => void): IThumbScroller | null;
