/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { Element } from 'mibreit-lazy-loader';
import IImageInfo from '../interfaces/IImageInfo';
export default class Image extends Element implements IImageInfo {
    private _title;
    private _description;
    constructor(imageHandle: HTMLElement);
    getTitle(): string;
    getDescription(): string;
    getUrl(): string | null;
    private _limitMaxSizeTo;
    private _prepareTitle;
    private _prepareDescription;
}
