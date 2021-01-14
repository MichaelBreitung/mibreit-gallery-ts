/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IImageStage {
  setZoomAnimation(activate: boolean): void;

  applyScaleMode(): void;

  setSize(widthCss: string, heightCss: string): void;

  setMargin(margin: string): void;

  showImage(show: boolean, zoom?: boolean): void;
}
