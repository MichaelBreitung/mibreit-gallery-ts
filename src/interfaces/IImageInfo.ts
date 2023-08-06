/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export default interface IImageInfo  {
  getTitle(): string;

  getUrl(): void;

  getWidth(): number;

  getHeight(): number;

  wasLoaded(): boolean;
}
