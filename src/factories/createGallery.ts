/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import Gallery, { GalleryConfig } from '../components/Gallery';

export default function (config: GalleryConfig): Gallery {
  return new Gallery(config);
}
