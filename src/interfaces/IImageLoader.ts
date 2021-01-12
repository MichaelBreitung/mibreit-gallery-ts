export default interface IImageLoader {
  load: () => Promise<boolean>;

  wasLoaded: () => boolean;
}
