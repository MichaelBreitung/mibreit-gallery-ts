/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from './domTools';
import {THUMBS_BUTTON_WIDTH_REM, THUMBS_MARGIN} from "../constants";

export default function(container: HTMLElement, numberOfVisibleThumbs: number, excludeMargin: boolean = false) : number
{
  const oneRemSize = DomTools.getRootFontSize();  
  const containerWidthRem = DomTools.getElementDimension(container).width / oneRemSize;
  const thumbsize = ((containerWidthRem - 2*THUMBS_BUTTON_WIDTH_REM) / numberOfVisibleThumbs) - (excludeMargin ? THUMBS_MARGIN : 0); 
  return thumbsize;
}