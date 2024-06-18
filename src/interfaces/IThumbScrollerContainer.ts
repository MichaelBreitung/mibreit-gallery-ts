/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IThumbScroller from './IThumbScroller';

export default interface IThumbScrollerContainer {
  getScroller(): IThumbScroller | null;
}
