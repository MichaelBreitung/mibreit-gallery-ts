import ImagesWall from '../components/ImagesWall';
export default class ImagesWallBuilder {
    private _containerElement;
    private _images;
    private _imagesWall;
    constructor(containerElement: HTMLElement, imageElements: NodeListOf<HTMLElement>, columns?: number, imageClickedCallback?: (index: number) => void);
    addImageClickedCallback(cb: (index: number) => void): ImagesWallBuilder;
    build(): ImagesWall;
    private _createImagesArray;
    private _addImageClickCallbacks;
}
