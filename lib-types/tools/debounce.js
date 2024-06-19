/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export default function (callback, wait, smooth = true) {
    let timeout;
    let waiting = false;
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
    }
    else {
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
