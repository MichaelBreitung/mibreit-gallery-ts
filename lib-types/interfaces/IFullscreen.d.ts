/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export default interface IFullscreen {
    activate(): void;
    deActivate(): void;
    addChangedCallback(callback: (active: boolean) => void): void;
    isActive(): boolean;
    setBackgroundColor(color: string): void;
}
