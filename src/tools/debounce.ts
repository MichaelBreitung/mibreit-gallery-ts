/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default function (callback: () => void, wait: number, smooth: boolean = true) {
  let timeout: number;
  let waiting: boolean = false;

  if (smooth) {
    return function debouncedCallback() {
      if (!waiting) {
        const later = () => {
          waiting = false;
          clearTimeout(timeout);
          callback();
        };
        waiting = true;
        timeout = window.setTimeout(later, wait);
      }
    };
  } else {
    return function debouncedCallback() {
      const later = () => {
        clearTimeout(timeout);
        callback();
      };
      clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
    };
  }
}
