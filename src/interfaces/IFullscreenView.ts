/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IFullscreenView {
  activate(): void;

  deActivate(): void;

  isFullscreenActive(): boolean;
}
