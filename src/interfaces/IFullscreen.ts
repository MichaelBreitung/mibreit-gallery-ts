/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IFullscreen {
  activate(): void;

  deActivate(): void;

  addFullscreenChangedCallback(callback: (active: boolean) => void): void;

  isFullscreenActive(): boolean;
}
