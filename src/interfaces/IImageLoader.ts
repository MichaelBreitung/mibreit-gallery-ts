/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IImageLoader {
  load: () => Promise<boolean>;

  wasLoaded: () => boolean;
}
