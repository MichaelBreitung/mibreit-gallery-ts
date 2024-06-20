/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IThumbScroller from './IThumbsViewer';
export default interface IThumbScrollerContainer {
    getScroller(): IThumbScroller | null;
}
