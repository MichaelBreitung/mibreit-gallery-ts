/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import ThumbScroller from '../components/ThumbScroller';
import IThumbScroller from '../interfaces/IThumbScroller';
import IThumbScrollerLayout from '../interfaces/IThumbScrollerLayout';

export default function (
  thumbScrollerLayout: IThumbScrollerLayout
): IThumbScroller {
  return new ThumbScroller(thumbScrollerLayout);    
}
