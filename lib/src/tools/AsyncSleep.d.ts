/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
declare const sleep: (ms: number) => Promise<void>;
declare const sleepTillNextRenderFinished: () => Promise<void>;
export { sleep, sleepTillNextRenderFinished };
