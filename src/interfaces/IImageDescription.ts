/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IImageDescription {
  show(): void;

  hide(): void;

  getDescriptionHandle(): HTMLElement;

  updateDescription(description: string): void;

  addChangedCallback(callback: (active: boolean) => void): void;
}
