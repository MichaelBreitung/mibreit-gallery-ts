export default interface IImageStage {
  applyScaleMode(): void;

  showImage(show: boolean, zoom?: boolean): void;

  setZoomAnimation(activate: boolean): void;
}
