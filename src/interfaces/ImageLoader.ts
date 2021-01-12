export default interface IImageLoader {
  load: () => Promise<boolean>;
}
