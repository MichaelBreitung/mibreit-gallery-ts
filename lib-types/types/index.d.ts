/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export declare enum EImageScaleMode {
    NONE = 0,
    FIT_ASPECT = 1,
    STRETCH = 2,
    EXPAND = 3
}
export type ThumbScrollerConfig = {
    numberOfVisibleThumbs?: number;
    initialIndex?: number;
};
export declare function checkThumbScrollerConfig(config: ThumbScrollerConfig): void;
export type SlideshowConfig = {
    scaleMode?: EImageScaleMode;
    interval?: number;
    zoom?: boolean;
    loaderWindowLeft?: number;
    loaderWindowRight?: number;
};
export declare function checkSlideshowConfig(config: SlideshowConfig): void;
export type GalleryConfig = SlideshowConfig & ThumbScrollerConfig & {
    thumbContainerSelector?: string;
    thumbSelector?: string;
};
export declare function checkGalleryConfig(config: GalleryConfig): void;
export type FullscreenConfig = {
    backgroundColor?: string;
    useAverageBackgroundColor?: boolean;
};
export declare function checkFullscreenConfig(config: FullscreenConfig): void;
