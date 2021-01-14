/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from '../tools/domTools';
import ImageStageExpand from './ImageStageExpand';
import styles from './ThumbStage.module.css';

export default class ThumbStage extends ImageStageExpand {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    super(imageHandle, imageWidth, imageHeight);
    const oldClasses = DomTools.getCssClass(this.imageStage);
    DomTools.applyCssClass(this.imageStage, `${oldClasses} ${styles.mibreit_ThumbStage}`);
  }
}
