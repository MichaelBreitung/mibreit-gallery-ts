var u=Object.defineProperty;var b=(s,e,r)=>e in s?u(s,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[e]=r;var t=(s,e,r)=>b(s,typeof e!="symbol"?e+"":e,r);import m from"./HorizontalScroller.js";class a{constructor(e){t(this,"_scroller");t(this,"_thumbsWrapper");t(this,"_scrollIndexChangedCallbacks",new Array);t(this,"_currentScrollIndex",0);this._thumbsWrapper=e,this._scroller=new m(e.getElements())}reinitSize(){this._thumbsWrapper.reinitSize(),this.setCenterThumb(this._currentScrollIndex,!1)}setCenterThumb(e,r=!0){let l=e;r&&(l-=Math.floor(this._thumbsWrapper.getNumberOfVisibleThumbs()/2));const h=this._normalizeIndex(l);this._currentScrollIndex=h;const i=-h*this._thumbsWrapper.getThumbSizeRem();this._scroller.scrollTo(i,!0),this._scrollIndexChangedCallbacks.forEach(n=>{n(this._currentScrollIndex)})}scrollNext(){let e=this._currentScrollIndex+this._thumbsWrapper.getNumberOfVisibleThumbs();const r=this._thumbsWrapper.getNumberOfThumbs()-this._thumbsWrapper.getNumberOfVisibleThumbs();this._currentScrollIndex===r?e=0:e>=r&&(e=r),this.setCenterThumb(e,!1)}scrollPrevious(){let e=this._currentScrollIndex-this._thumbsWrapper.getNumberOfVisibleThumbs();const r=this._thumbsWrapper.getNumberOfThumbs()-this._thumbsWrapper.getNumberOfVisibleThumbs();this._currentScrollIndex===0?e=r:e<0&&(e=0),this.setCenterThumb(e,!1)}addScrollIndexChangedCallback(e){this._scrollIndexChangedCallbacks.includes(e)||this._scrollIndexChangedCallbacks.push(e)}_normalizeIndex(e){const r=this._thumbsWrapper.getNumberOfThumbs()-this._thumbsWrapper.getNumberOfVisibleThumbs();return e>=r?r:e<0?0:e}}export{a as default};