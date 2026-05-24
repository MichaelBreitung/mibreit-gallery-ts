import ImagesWall from '../components/ImagesWall';
export default class ImagesWallBuilder {
    private _containerElement;
    private _scrollLoaderDelay;
    private _images;
    private _imagesWall;
    constructor(containerElement: HTMLElement, imageElements: NodeListOf<HTMLElement>, columns?: number);
    addImageClickedCallback(cb: (index: number) => void): ImagesWallBuilder;
    setScrollLoaderDelay(delay: number): ImagesWallBuilder;
    build(): ImagesWall;
    private _createImagesArray;
    private _addImageClickCallbacks;
}
