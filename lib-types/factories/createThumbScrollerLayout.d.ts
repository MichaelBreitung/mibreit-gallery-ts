/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import Image from '../components/Image';
import IThumbScrollerLayout from '../interfaces/IThumbsWrapper';
export default function (container: HTMLElement, thumbs: Array<Image>, numberOfVisibleThumbs?: number, thumbClickedCallback?: (index: number) => void): IThumbScrollerLayout;
