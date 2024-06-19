/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sleep = function (ms) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    });
};
const sleepTillNextRenderFinished = function () {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
};
export { sleep, sleepTillNextRenderFinished };
