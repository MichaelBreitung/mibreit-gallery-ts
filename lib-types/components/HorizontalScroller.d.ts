/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export default class HorizontalScroller {
    private _scroller;
    constructor(elements: Array<Node>);
    scrollTo(position: number, useRem?: boolean): boolean;
    private _createScroller;
}
