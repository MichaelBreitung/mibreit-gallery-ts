/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import FullscreenOnlyGallery, { FullscreenOnlyGalleryConfig } from '../containers/FullscreenOnlyGallery';

export default function (config: FullscreenOnlyGalleryConfig): FullscreenOnlyGallery {  
  return new FullscreenOnlyGallery(config);
}
