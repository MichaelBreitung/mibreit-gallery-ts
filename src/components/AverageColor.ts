/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { FastAverageColor } from 'fast-average-color';
import { BACKGROUND_COLOR_VARIABLE, FOREGROUND_COLOR_VARIABLE } from '../constants';

export default class AverageColor {
  private _fastAverageColor;
  constructor() {
    this._fastAverageColor = new FastAverageColor();
  }

  public updateColors(image: HTMLImageElement) {
    try {
      const color = this._fastAverageColor.getColor(image, {
        algorithm: 'sqrt',
        silent: true,
      });
      document.documentElement.style.setProperty(BACKGROUND_COLOR_VARIABLE, color.rgb);
      if (color.isDark) {
        document.documentElement.style.setProperty(FOREGROUND_COLOR_VARIABLE, 'white');
      } else {
        document.documentElement.style.setProperty(FOREGROUND_COLOR_VARIABLE, 'black');
      }
    } catch (_e) {
      // If the image is not loaded yet, we cannot get the average color
      // This doesn't concern us though, so we ignore the error
    }
  }
}
