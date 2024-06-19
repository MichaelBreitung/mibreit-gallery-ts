/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

const sleep = async function (ms: number): Promise<void> {
  // @ts-ignore
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const sleepTillNextRenderFinished = async function (): Promise<void> {
  // @ts-ignore
  return new Promise((resolve, reject) => {
    requestAnimationFrame(() => {
      // fires before next repaint
      requestAnimationFrame(() => {
        // fires before the _next_ next repaint
        // ...which is effectively _after_ the next repaint
        resolve();
      });
    });
  });
};

export { sleep, sleepTillNextRenderFinished };
