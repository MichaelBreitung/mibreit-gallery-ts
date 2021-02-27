/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import FullscreenOnlyGalleryContainer, { FullscreenOnlyGalleryConfig } from '../containers/FullscreenOnlyGalleryContainer';
import IGalleryContainer from '../interfaces/IGalleryContainer';

export default function (config: FullscreenOnlyGalleryConfig): IGalleryContainer {  
  return new FullscreenOnlyGalleryContainer(config);
}
